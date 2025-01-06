import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

function StudentHomePage() {
  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  return (
    <div>
      Student homepage
      <Button onClick={handleLogout}>Log out </Button>
    </div>
  );
}

export default StudentHomePage;
