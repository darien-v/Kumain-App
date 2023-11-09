import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkUser, getName } from "../../Common/Services/AuthService.js";
import Parse from "parse";

export default function Home() {
    const [authenticated, setAuthenticated] = useState(false);
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const name = await getName();
          setFirstName(name || ''); // Update state with the retrieved name
        } catch (error) {
          console.error('Error fetching name:', error);
        }
      };
      fetchData();
        if (checkUser()) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
      }, [authenticated]);
    
    return (
        <div>
        <section>
            <h2>ku·ma·in</h2>
            <p>/kuˈmaʔin/</p>
            <p>verb</p>
            <p>to eat, nourish oneself with food</p>
            <p>"Kumain ka na ba?" or "Have you eaten?"</p>
            <hr />
            <p>
            Kumain is cooking simplified. Want to learn how to cook a specific dish?
            Learn a new skill in the kitchen? Follow your favorite cooks and their
            recipes? Or just figure out what to cook with what you've got on hand?
            Kumain can do all that and more!
            </p>
            {/*I'd like to have the protected homepage show more than just a welcome message. Maybe recipe reccommendations?*/}
            {authenticated && (
            <div>
              <h3>Welcome, {firstName}!</h3>
            </div>
            )}
        </section>
        {/* dont allow users to register or login if they are already logged in */}
        {!authenticated && (
        <div>
            <Link to="/register">
              <button>Register</button>
            </Link>
            <br />
            <br />
            <Link to="/login">
              <button>Login</button>
            </Link>
        </div>
      )}
      </div>
    );
}