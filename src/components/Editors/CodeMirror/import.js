// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'

// theme css
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/erlang-dark.css'
import 'codemirror/theme/lesser-dark.css'
import 'codemirror/theme/mbo.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/theme/solarized.css'

// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchBrackets';

// merge
import 'codemirror/addon/merge/merge.js'
import 'codemirror/addon/merge/merge.css'

/* 代码检查：只引入了json检查，其余提示缺少WINDOW.JSLINT等相关依赖，报错 */
// lint
require('script-loader!jsonlint')
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
// import 'codemirror/addon/lint/javascript-lint'
// import 'codemirror/addon/lint/coffeescript-lint'
// import 'codemirror/addon/lint/css-lint'
// import 'codemirror/addon/lint/yaml-lint'

// fold
import 'codemirror/addon/fold/foldgutter.css'
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')

// styleActiveLine
import 'codemirror/addon/selection/active-line'

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';

// extraKeys
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/css-hint'
