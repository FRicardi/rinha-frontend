<script type="text/javascript">
  import TreeNode from './components/TreeNode.svelte'
  import { loadJson } from './lib/loadFile.js'

  let loadingFile = undefined;

  function handleLoadFile(event) {
    loadingFile = loadJson(event);
  }
</script>

<main>
  {#if loadingFile}
    {#await loadingFile}
      <p>loading</p>
    {:then file}
      <section name="tree-view" style="height: 700px; overflow: scroll; display: block; text-align: left" >
        <h1>{file.name}</h1>
        {#each Object.entries(file.json).slice(0, 3500) as [jsonKey, value]}
          <TreeNode node={value} key={jsonKey} depth={0} />
        {/each}
      </section>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  {:else}
    <h1>JSON Tree Viewer</h1>
    <h2>Simple JSON Viewer that runs completely on-client. No data exchange.</h2>
    <input type="file" name="load-json" on:change={handleLoadFile} />
  {/if}
</main>
