"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const authorizeUrl = "https://geonode.geoportal.co.id/o/authorize?response_type=token&client_id=ffRFcGzorpEncfGEwh945SRJmHnLN2YdpAxfqwNd";

    // Redirect to the GeoNode authorization page
    window.location.href = authorizeUrl;

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Get the hash parameters
    const accessToken = params.get("access_token");
    console.log(accessToken)

    if (accessToken) {
      // Store the access token in local storage or state
      localStorage.setItem("geonode_access_token", accessToken);

      // Optionally, redirect to another page after successful login
      router.push("/systemdynamic");
    } else {
      // Handle error (e.g., if access token is missing)
      console.error("Authorization failed");
    }
  }, [router]);

  return <div>Logging in...</div>;
};

export default CallbackPage;
