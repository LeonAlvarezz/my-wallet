import { ThemeProvider } from "./modules/theme/theme-provider";
import { ThemeToggle } from "./modules/theme/components/ThemeToggle";
import BottomNav from "./components/bottom-nav/BottomNav";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="max-w-mobile relative m-auto flex min-h-dvh flex-col border">
          {/* <div>
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i}>
                <h1>Feature coming up</h1>
                <Button>Learn More</Button>
              </div>
            ))} 
          </div> */}

          <div className="max-w-mobile fixed inset-x-0 bottom-0 m-auto">
            <ThemeToggle className="mr-2 mb-24 place-self-end" />
          </div>

          <BottomNav />

          {/* <ThemeToggle className="fixed right-2 bottom-2" /> */}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
