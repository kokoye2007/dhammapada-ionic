<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <body>
        <xsl:for-each select="Dhammapada/Chapters/Chapter">
          <h1><xsl:value-of select="Title"/> - <xsl:value-of select="Pali"/></h1>
          <xsl:apply-templates select="Verses/Verse"/>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>


  <xsl:template match="Verse">
    <h2><xsl:value-of select="Summary"/></h2>
    <xsl:apply-templates select="Paragraphs"/>
    <!-- <xsl:apply-templates select="Story"/> -->
  </xsl:template>

  <xsl:template match="Par">
    <!-- <img>
      <xsl:attribute name="src">
        ../../images/hi/Dhammapada_<xsl:value-of select="Nr"/>.jpg
      </xsl:attribute>
    </img>
    -->
    <p><xsl:value-of select="Txt"/></p>
    <p/>
  </xsl:template>

  <xsl:template match="Story">
    <h3><xsl:value-of select="Title"/></h3>
    <p><xsl:value-of select="Txt"/></p>
  </xsl:template>
</xsl:stylesheet>
