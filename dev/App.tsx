import type { Component } from 'solid-js'
import logo from './logo.svg'
import styles from './App.module.css'
import { PostHogProvider } from 'src/index'

const App: Component = () => {
  return (
    <PostHogProvider apiKey="leaked_my_key" options={{ debug: true }}>
      <div class={styles.App}>
        <header class={styles.header}>
          <img src={logo} class={styles.logo} alt="logo" />
          <h1></h1>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            class={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
        </header>
      </div>
    </PostHogProvider>
  )
}

export default App
