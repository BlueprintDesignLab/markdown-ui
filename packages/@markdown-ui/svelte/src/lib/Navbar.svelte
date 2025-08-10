<script>
  import { page } from '$app/stores';
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: 'https://markdown-ui-chat.blueprintlab.io', label: 'Chat Demo' },
    { href: '/streaming', label: 'Streaming Demo' },
    { href: '/editor', label: 'Editor Demo' },
    { href: '/spec', label: 'Specification' },
    { href: 'https://github.com/BlueprintDesignLab/markdown-ui', label: 'github' }
  ];
</script>

<nav class="navbar">
  <div class="nav-container">
    <h1 class="nav-title">Markdown UI</h1>
    <ul class="nav-links">
      {#each navItems as item}
        <li>
          <a 
            href={item.href} 
            class:active={$page.url.pathname === item.href}
            target={item.href.startsWith("https") ? '_blank' : undefined}
            rel={item.href.startsWith("https") ? 'noopener noreferrer' : undefined}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .navbar {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }
  
  .nav-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
  }
  
  .nav-links a:hover {
    color: #374151;
    background: #f9fafb;
  }
  
  .nav-links a.active {
    color: #3b82f6;
    background: #dbeafe;
  }
  
  @media (max-width: 768px) {
    .nav-container {
      padding: 0 1rem;
      flex-direction: column;
      height: auto;
      gap: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    
    .nav-title {
      font-size: 1.25rem;
    }
    
    .nav-links {
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .nav-links a {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      min-width: 80px;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .nav-container {
      padding: 0 0.75rem;
      gap: 0.75rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
    
    .nav-title {
      font-size: 1.1rem;
    }
    
    .nav-links {
      gap: 0.5rem;
      width: 100%;
    }
    
    .nav-links li {
      flex: 1;
    }
    
    .nav-links a {
      padding: 0.625rem 0.5rem;
      font-size: 0.8rem;
      width: 100%;
      display: block;
    }
  }
  
</style>