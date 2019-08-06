<template>
  <div id="show-content"
       class="show-content">
  </div>
</template>

<script>
// npm
import showdown from 'showdown';

export default {
  name: 'ShowDown',
  props: {
    // Markdown内容
    markDownContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // Markdown容器
      converter: null
    };
  },
  watch: {
    markDownContent: 'contentChanged'
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var converter = new showdown.Converter({
        backslashEscapesHTMLTags: true,
        completeHTMLDocument: true,
        disableForced4SpacesIndentedSublists: true,
        emoji: true,
        encodeEmails: true,
        excludeTrailingPunctuationFromURLs: true,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        ghMentionsLink: 'https://github.com/{u}',
        headerLevelStart: true,
        literalMidWordAsterisks: true,
        literalMidWordUnderscores: true,
        metadata: true,
        noHeaderId: true,
        omitExtraWLInCodeBlocks: true,
        openLinksInNewWindow: true,
        parseImgDimensions: true,
        prefixHeaderId: true,
        rawHeaderId: true,
        rawPrefixHeaderId: true,
        requireSpaceBeforeHeadingText: true,
        simpleLineBreaks: true,
        simplifiedAutoLink: true,
        smartIndentationFix: true,
        smoothLivePreview: true,
        splitAdjacentBlockquotes: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true,
        underline: true
      });
      this.converter = converter;
      // console.log(converter.getOptions());
    },
    // Markdown编辑器内容发生改变
    contentChanged() {
      // console.log(this.markDownContent);
      var html = this.converter.makeHtml(this.markDownContent);
      document.getElementById('show-content').innerHTML = html;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./showdown.scss";
</style>
