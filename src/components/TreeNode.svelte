<script type="text/javascript">
  export let key = ""
  export let node;
  export let depth = 0;
  
  let isNodeLoopable = typeof node == 'object' || Array.isArray(node);
</script>

<div style='padding-left: {depth * 20}px'>
  {key}{!isNodeLoopable ? `: ${node}` : ""}
</div>


{#if isNodeLoopable && !!node}
  {#each Object.entries(node) as [nodeChildKey, nodeChild]}
    <svelte:self key={nodeChildKey} node={nodeChild} depth={depth + 1} />
  {/each}
{/if}
