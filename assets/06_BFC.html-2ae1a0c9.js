import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o,c,b as i}from"./app-da7e9072.js";const d={},a=i('<h2 id="什么是bfc" tabindex="-1"><a class="header-anchor" href="#什么是bfc" aria-hidden="true">#</a> 什么是BFC</h2><p>BFC（Block Formatting Context）即块级格式化上下文，是一个<strong>独立</strong>的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。</p><h2 id="如何创建bfc" tabindex="-1"><a class="header-anchor" href="#如何创建bfc" aria-hidden="true">#</a> 如何创建BFC</h2><ul><li>根元素或包含根元素的元素<code>&lt;html&gt;</code></li><li>浮动元素</li><li><code>position</code>: <code>absolute</code>或<code>fixed</code></li><li><code>display</code>:不为<code>none</code></li><li><code>overflow</code>:不为<code>visible</code></li></ul><h2 id="bfc的特性" tabindex="-1"><a class="header-anchor" href="#bfc的特性" aria-hidden="true">#</a> BFC的特性</h2><ol><li>不会存在外边距合并(<code>margin</code>塌陷问题)</li><li><code>float</code>,浮动元素会参与高度计算</li></ol><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><ul><li>防止<code>margin</code>塌陷</li><li>清除浮动</li><li>自适应两栏布局</li></ul>',8),l=[a];function t(r,n){return o(),c("div",null,l)}const f=e(d,[["render",t],["__file","06_BFC.html.vue"]]);export{f as default};