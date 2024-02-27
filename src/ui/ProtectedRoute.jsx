import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. if there is no authenticated user, redirect do /login
  // useEffect(
  //   function () {
  //     if (!isLoading && !isAuthenticated && fetchStatus !== "fetching")
  //       navigate("/login");
  //   },
  //   [isAuthenticated, isLoading, navigate]
  // );

  //3. while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //2. if there is no authenticated user, redirect do /login

  if (!isAuthenticated) navigate("/login");

  //4. is there is user, render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
