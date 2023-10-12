<script type="text/javascript">
  import TreeNode from './components/TreeNode.svelte'
  import { loadJson } from './lib/loadFile.js'

  let loadingFile = undefined;

  function handleLoadFile(event) {
    loadingFile = loadJson(event);
  }
</script>

<main>
  <h1>JSON Tree Viewer</h1>
  <h2>Simple JSON Viewer that runs completely on-client. No data exchange.</h2>

  <input type="file" name="load-json" on:change={handleLoadFile} />

  {#if loadingFile}
    {#await loadingFile}
      <p>loading</p>
    {:then json}
      <section name="tree-view" style="height: 700px; overflow: scroll; display: block; text-align: left" >
        {#each Object.keys(json) as jsonKey}
          <TreeNode node={json[jsonKey]} key={jsonKey} depth={0} />
        {/each}
      </section>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  {/if}
</main>
