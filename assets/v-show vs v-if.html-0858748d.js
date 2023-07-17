import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,b as n}from"./app-df50faf2.js";const o={},c=n(`<h2 id="相同点" tabindex="-1"><a class="header-anchor" href="#相同点" aria-hidden="true">#</a> 相同点</h2><p>都能够达到控制元素显示隐藏的效果</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>v-show<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>v-if<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点" aria-hidden="true">#</a> 不同点</h2><p>但是他们达到效果的方式不同</p><h3 id="方式" tabindex="-1"><a class="header-anchor" href="#方式" aria-hidden="true">#</a> 方式</h3><ul><li><p><code>v-show</code> 是通过控制元素的 <code>display</code> 属性来实现的</p><ul><li>假如 <code>isShow</code> 为 <code>false</code>，那么 <code>v-show</code> 会将元素的 <code>display</code> 属性设置为 <code>none</code></li><li>假如<code>isShow</code> 为 <code>true</code>，那么 <code>v-show</code> 会将元素的 <code>display</code> 属性设置为 <code>block</code></li></ul></li><li><p><code>v-if</code> 是通过控制元素的 <code>DOM</code> 结构来实现的</p><ul><li>假如 <code>isShow</code> 为 <code>false</code>，那么 <code>v-if</code> 会将元素从 <code>DOM</code> 结构中移除</li><li>假如 <code>isShow</code> 为 <code>true</code>，那么 <code>v-if</code> 会将元素添加到 <code>DOM</code> 结构中</li><li>同样的当<code>DOM</code>结构中的元素被移除后，那么该元素的事件监听器也会被移除</li></ul></li></ul><h3 id="编译过程" tabindex="-1"><a class="header-anchor" href="#编译过程" aria-hidden="true">#</a> 编译过程</h3><ul><li><code>v-show</code>: 在编译过程中，会在元素上添加一个 <code>style</code> 属性，用来控制元素的 <code>display</code> 属性,只涉及<code>CSS</code>的变化，不会涉及到<code>DOM</code>结构的变化</li><li><code>v-if</code>：在编译过程中，会在元素上添加一个 <code>ifConditions</code> 属性，用来控制元素的 <code>DOM</code> 结构，涉及到<code>DOM</code>结构的变化</li></ul><h3 id="触发生命周期" tabindex="-1"><a class="header-anchor" href="#触发生命周期" aria-hidden="true">#</a> 触发生命周期</h3><ul><li><code>v-show</code>: 不会触发任何生命周期，因为只涉及到<code>CSS</code>的变化，不会涉及到<code>DOM</code>结构的变化</li><li><code>v-if</code>: 会触发元素的生命周期，因为涉及到<code>DOM</code>结构的变化 <ul><li>当<code>isShow</code>从<code>false</code>变为<code>true</code>时，会触发元素的<code>beforeCreate</code>、<code>created</code>、<code>beforeMount</code>、<code>mounted</code>生命周期</li><li>当<code>isShow</code>从<code>true</code>变为<code>false</code>时，会触发元素的<code>beforeUnmount</code>、<code>unmounted</code>生命周期</li></ul></li></ul><h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能" aria-hidden="true">#</a> 性能</h3><ul><li><code>v-show</code>: 由于只涉及到<code>CSS</code>的变化，所以性能比较好</li><li><code>v-if</code>: 由于涉及到<code>DOM</code>结构的变化，所以性能比较差</li></ul>`,13),t=[c];function d(l,i){return a(),s("div",null,t)}const r=e(o,[["render",d],["__file","v-show vs v-if.html.vue"]]);export{r as default};
