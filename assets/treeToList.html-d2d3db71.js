import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-406a0537.js";const p={},e=t(`<h2 id="题目要求" tabindex="-1"><a class="header-anchor" href="#题目要求" aria-hidden="true">#</a> 题目要求</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;节点1&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;节点1_1&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parentId</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上面这个树结构的数据转换成下面这种列表结构</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;节点1&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;节点1_1&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parentId</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><p><strong>类似的像这种层层嵌套的，一般都是使用递归来做</strong></p><ul><li>首先我们需要一个函数，这个函数接收一个参数，这个参数就是我们的树结构数据</li><li>其次我们需要对<code>children</code>，也就是子节点进行遍历，遍历的同时，我们需要把每个子节点的<code>children</code>也进行遍历，这样就可以把所有的节点都遍历到了</li><li><strong>我们维护一个队列，将需要访问的节点放在队列里面</strong></li></ul><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 将树型结构转换为列表
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Object<span class="token punctuation">}</span> object 树型结构
 * <span class="token keyword">@returns</span> <span class="token punctuation">{</span>Array<span class="token punctuation">}</span> 列表
 */</span>

<span class="token keyword">interface</span> <span class="token class-name">TreeToList</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    text<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    parentId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    children<span class="token operator">?</span><span class="token operator">:</span> TreeToList<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">TreeToListResult</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    text<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    parentId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">treeToList</span><span class="token punctuation">(</span>object<span class="token operator">:</span> TreeToList<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeToListResult<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回结果</span>
    <span class="token keyword">let</span> result<span class="token operator">:</span> TreeToListResult<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置一个队列，用于存放待处理的数据</span>
    <span class="token keyword">let</span> queue<span class="token operator">:</span> TreeToList<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 首先让树型结构入队</span>
    queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 然后依次处理队列中的数据</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取出队列中的第一个数据</span>
        <span class="token keyword">let</span> curr <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">;</span>
        <span class="token comment">// 将当前数据放入返回结果中</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">constructorTreeToList</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果当前数据有子节点，则将子节点入队</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>curr<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>curr<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">constructorTreeToList</span><span class="token punctuation">(</span>node<span class="token operator">:</span> TreeToList<span class="token punctuation">)</span><span class="token operator">:</span> TreeToListResult <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        id<span class="token operator">:</span> node<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
        text<span class="token operator">:</span> node<span class="token punctuation">.</span>text<span class="token punctuation">,</span>
        parentId<span class="token operator">:</span> node<span class="token punctuation">.</span>parentId
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","treeToList.html.vue"]]);export{d as default};
