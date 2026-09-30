import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowRight, Braces, CornerDownRight } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [name, setName] = useState('');
  const [greeted, setGreeted] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setGreeted(trimmedName);
  }

  return (
    <main className="welcome-page">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Little Web home">
          <span className="wordmark-mark" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          <span>little web</span>
        </a>
        <div className="page-counter">
          <span className="counter-dot" />
          A SMALL BEGINNING <span className="counter-divider">/</span> 01
        </div>
      </header>

      <section className="welcome-content" aria-labelledby="welcome-heading">
        <div className="intro-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            YOUR FIRST PAGE ON THE INTERNET
          </div>
          <h1 id="welcome-heading" className="hero-title" data-testid="text-greeting">
            Hello,<br />
            <span className="hero-world">world<span className="period">.</span></span>
          </h1>
          <p className="hero-description">
            You made it here. That means the web is already a little more yours.
            Take a look around — this is how making a website starts.
          </p>
        </div>

        <div className="sun-stamp" aria-hidden="true">
          <span className="sun-rays" />
          <span className="sun-core" />
          <span className="sun-caption">A GOOD<br />PLACE TO START</span>
        </div>

        <div className="hello-panel">
          <div className="panel-heading">
            <div className="panel-icon"><Braces size={18} strokeWidth={1.8} /></div>
            <div>
              <h2>Make it say hello to you</h2>
              <p>A tiny experiment. No wrong answers.</p>
            </div>
          </div>
          <form className="hello-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="visitor-name">Your name</label>
            <input
              id="visitor-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="What should we call you?"
              autoComplete="given-name"
              maxLength={48}
              data-testid="input-name"
            />
            <button type="submit" data-testid="button-say-hello">
              Say hello <ArrowRight size={17} strokeWidth={2} />
            </button>
          </form>
          {greeted ? (
            <div className="greeting-result" role="status" data-testid="status-personal-greeting">
              <span className="result-marker" />
              <p><strong>Hello, {greeted}.</strong> Look at you, making things happen.</p>
            </div>
          ) : (
            <div className="panel-hint">
              <CornerDownRight size={14} strokeWidth={1.8} />
              <span>Type your name, then press the button.</span>
            </div>
          )}
        </div>

        <div className="code-note">
          <div className="code-note-top">
            <span className="code-dot coral" />
            <span className="code-dot yellow" />
            <span className="code-dot mint" />
            <span className="code-label">A LITTLE BIT OF HTML</span>
          </div>
          <code><span className="code-bracket">&lt;h1&gt;</span>Hello, world!<span className="code-bracket">&lt;/h1&gt;</span></code>
          <span className="code-note-caption">The words behind the welcome.</span>
        </div>
      </section>

      <footer className="page-footer">
        <span>THE BEGINNING OF SOMETHING</span>
        <span className="footer-spark" aria-hidden="true" />
        <span>MADE FOR THE CURIOUS</span>
      </footer>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
