<script type="text/javascript">
  export let key = ""
  export let node;
  export let depth;
  export let style = "text";
  
  let isNodeLoopable = typeof node == 'object' || Array.isArray(node); 

  function formatNode () {
    if (!node)
      return ''
    
    if (typeof node === 'string')
      return `"${node}"`;

    if (Array.isArray(node))
      return "["

    if (!isNodeLoopable)
      return `${node}`;

    return '';
  }
</script>

<style type="text/css">
  .tree-node { 
    padding-left: 20px;
  }

  .inner-node {
    border-left: 1px solid #BFBFBF;
  }

  .arrayKey {
    color: #BFBFBF;
  }
  
  .text {
    color: #4E9590;
  }

  .brackets {
    color: #F2CAB8;
  }
</style>


<div class="tree-node {depth !== 0 ? 'inner-node' : ''}">
  <span class={style}>{key}:</span><span class={Array.isArray(node) ? "brackets" : ""}>{formatNode()}</span>


  {#if isNodeLoopable}
    {#each Object.entries(node) as [nodeChildKey, nodeChild]}
      <svelte:self key={nodeChildKey} node={nodeChild} depth={depth + 1} style={Array.isArray(node) ? "arrayKey" : "text"}/>
    {/each}
  {/if}

</div>
  {#if Array.isArray(node)}
    <svelte:self key="]" {depth} node={undefined} style="brackets"/>
  {/if}
