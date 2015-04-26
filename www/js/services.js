'use strict';

angular.module('services.dataprovider', ['ngResource'])
.filter('nlToArray', function() {
  return function(text) {
    if (text) { return text.split('\n'); }
    return "";
  };
})
.factory('dataprovider', function ($resource, $q) {
  var dhammapada = null;
  var chapters = {};
  var getDhammapada = function() {
      if (dhammapada) {
        var defer = $q.defer();
        defer.resolve(dhammapada);
        return defer.promise;
      } else {
        return $resource('data/json/dhammapada.json').get().$promise.then(function(d) { 
          dhammapada = d;
          return dhammapada;
        });
      }
  };

  var getChapter = function(chapter) {
      if (chapters[chapter]) {
        var defer = $q.defer();
        defer.resolve(chapters[chapter]);
        return defer.promise;
      } else {
        return $resource('data/json/:chapter.json', { chapter: chapter }).get().$promise.then(
          function(c) {
          chapters[chapter] = c;
          return c;
        });
      }
  };
  return {
    Dhammapada : getDhammapada(),
    Chapter : getChapter,
    Verse : function(verse) {
      // First find the chapter that contains the verse.
      verse = parseInt(verse);
      return getDhammapada().then( function(d) {
        var chapter = null;
        for(var i = 0; i < d.Chapters.length; i++) {
          if (parseInt(d.Chapters[i].FirstParagraph) <= verse && verse <= parseInt(d.Chapters[i].LastParagraph)) {
            chapter = d.Chapters[i];
            break;
          }
        }

        // Now let's get the right chapter..
        return getChapter(chapter.Nr).then(function(c) {
          var pars = c.Chapter.Verses.Verse;
          for(var i = 0; i < pars.length; i++) {
            var para = pars[i];
            // 2 cases.. This verse has multiple paragraph..
            // Or only 1.
            if (angular.isArray(para.Paragraphs.Par)) {
              for(var j = 0; j < para.Paragraphs.Par.length; j++) {
                if (para.Paragraphs.Par[j].Nr == verse) {
                  // We found it!
                  return {
                    chapter : chapter,
                    text : para.Paragraphs.Par[j].Txt,
                    nr : verse,
                    summary : para.Summary,
                    story : { title : para.Story.Title, text : para.Story.Txt }
                  };
                }
              }
            } else {
              // In case of 1..
              if (para.Paragraphs.Par.Nr == verse) {
                // We found it!
                return {
                  chapter : chapter,
                  text : para.Paragraphs.Par.Txt,
                  nr : verse,
                  summary : para.Summary,
                  story : { title : para.Story.Title, text : para.Story.Txt }
                };
              }
            }
          }
        });
      });
    }
  };
});
