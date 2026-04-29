import "./App.css"
import {
  useUser,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/react";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // wait for Clerk to load
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <h1>Welcome to App</h1>

      {!isSignedIn ? (
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      ) : (
        <>
          <SignOutButton>
            <button>Sign Out</button>
          </SignOutButton>

          <UserButton />
        </>
      )}
    </>
  );
}

export default App;