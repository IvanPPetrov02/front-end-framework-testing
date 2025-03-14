<script>
  import SvelteFlowComponent from "./lib/SvelteFlowComponent.svelte";
  import SvelvetFlowComponent from "./lib/SvelvetFlowComponent.svelte";
  import { writable } from 'svelte/store';

  // Shared workflow data for comparison - simplified for compatibility
  const sharedNodes = [
    { id: '1', label: 'Input', variable: 'transaction' },
    { id: '2', label: 'Process', variable: 'calculation' },
    { id: '3', label: 'Transform', variable: 'conversion' },
    { id: '4', label: 'Output', variable: 'result' }
  ];

  // Create active tab state
  let activeTab = 'demo'; // Starting with demo for easier testing

  // Feature comparison data
  const features = [
    { feature: 'Custom nodes', svelteflow: '✓ Fully customizable', svelvet: '' },
    { feature: 'Edge styling', svelteflow: '✓ Multiple edge types', svelvet: '' },
    { feature: 'Performance', svelteflow: '✓ Better with large graphs', svelvet: '' },
    { feature: 'Learning curve', svelteflow: 'Steeper but more powerful', svelvet: '' },
    { feature: 'Documentation', svelteflow: 'Extensive', svelvet: '' }
  ];
</script>

<main>
  <h1>Flow Library Comparison</h1>

  <div class="tab-container">
    <button class={activeTab === 'features' ? 'active' : ''} on:click={() => activeTab = 'features'}>
      Feature Comparison
    </button>
    <button class={activeTab === 'demo' ? 'active' : ''} on:click={() => activeTab = 'demo'}>
      Live Demo
    </button>
  </div>

  {#if activeTab === 'features'}
    <div class="feature-table">
      <table>
        <thead>
        <tr>
          <th>Feature</th>
          <th>SvelteFlow</th>
          <th>Svelvet</th>
        </tr>
        </thead>
        <tbody>
        {#each features as { feature, svelteflow, svelvet }}
          <tr>
            <td>{feature}</td>
            <td>{svelteflow}</td>
            <td>{svelvet}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="workflow-container">
      <div class="workflow">
        <h2>SvelteFlow</h2>
        <p>Rich features with full customization</p>
        <SvelteFlowComponent {sharedNodes} />
      </div>

      <div class="workflow">
        <h2>Svelvet</h2>
        <p>Simple Svelte-native flow diagrams</p>
        <SvelvetFlowComponent {sharedNodes} />
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .tab-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .tab-container button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: all 0.3s;
  }

  .tab-container button.active {
    background-color: #007bff;
    color: white;
  }

  .feature-table {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  .workflow-container {
    display: flex;
    gap: 30px;
    height: 650px;
  }

  .workflow {
    flex: 1;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .workflow h2 {
    margin: 0 0 5px 0;
    color: #007bff;
  }

  .workflow p {
    margin: 0 0 15px 0;
    color: #666;
    font-size: 14px;
  }
</style>