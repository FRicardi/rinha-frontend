<script type="text/javascript">
  export let key = ""
  export let node;
  export let depth;
  
  let isNodeLoopable = typeof node == 'object' || Array.isArray(node); 

  function formatNode () {
    if (!node)
      return ''
    
    if (typeof node === 'string')
      return `": ${node}"`;

    if (Array.isArray(node))
      return ":["

    if (!isNodeLoopable)
      return `: ${node}`;    

    if (node)
      return ':';   
  }
</script>

<style type="text/css">
  .tree-node { 
    padding-left: 20px;
  }

  .inner-node {
    border-left: 1px solid black;
  }
</style>


<div class="tree-node {depth !== 0 ? 'inner-node' : ''}">
  {key}{formatNode()}


  {#if isNodeLoopable}
    {#each Object.entries(node) as [nodeChildKey, nodeChild]}
      <svelte:self key={nodeChildKey} node={nodeChild} depth={depth + 1} />
    {/each}
  {/if}

</div>
  {#if Array.isArray(node)}
    <svelte:self key="]" {depth} node={undefined} />
  {/if}
