for i in {0..26}; do ./xml2json.py --strip_namespace  --strip_text --pretty www/data/xml/$i.xml -o www/data/json/$i.json; done
echo '<?xml version="1.0" encoding="utf-8"?>' > www/data/xml/all.xml
echo '<Dhammapada><Chapters>' >> www/data/xml/all.xml
for i in {0..26}; do cat www/data/xml/$i.xml >> www/data/xml/all.xml; done
echo '</Chapters></Dhammapada>' >> www/data/xml/all.xml
xmllint --recover --format www/data/xml/all.xml > www/data/xml/book.xml
rm www/data/xml/all.xml
