<script type="text/javascript">
  import TreeNode from './components/TreeNode.svelte'
  import { loadJson } from './lib/loadFile.js'

  let loadingFile = undefined;

  function handleLoadFile(event) {
    loadingFile = loadJson(event);
  }
</script>

<style type="text/css">
  [name="tree-view-container"] {
    display: flex;
    flex-direction: column;
    height: 100vh;
    text-align: left;
  }
  [name="tree-view-items"] {
    overflow: scroll;
  }

  [name="tree-view-items"]::-webkit-scrollbar {
    display: none;
  }
</style>


<main>
  {#if loadingFile}
    {#await loadingFile}
      <p>loading</p>
    {:then file}
      <section name="tree-view-container">
        <h1>{file.name}</h1>
        <section name="tree-view-items">
          {#each Object.entries(file.json).slice(0, 3500) as [jsonKey, value]}
            <TreeNode node={value} key={jsonKey} depth={0} />
          {/each}
        </section>
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
