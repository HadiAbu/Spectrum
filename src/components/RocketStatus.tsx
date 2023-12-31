import styled from "styled-components";

type RocketProps = {
  statusMessage: string | undefined;
  isAscending: boolean | undefined;
  isActionRequired?: boolean | undefined;
};

const StatusSection = styled.h2`
  text-align: center;
`;

/**
 * @param statusMessage
 * @param isAscending
 * @param isActionRequired
 * @returns a component to display the status of the rocket and if to perform an action
 */
const RocketStatus = ({
  statusMessage,
  isAscending,
  isActionRequired,
}: RocketProps) => {
  return (
    <>
      {statusMessage ? <StatusSection>{statusMessage}</StatusSection> : null}
      {isAscending != null && (
        <p>
          The Spacecraft is currently{" "}
          <strong>{isAscending ? "Ascending" : "Descending"}</strong>
        </p>
      )}
      {isActionRequired != null && (
        <h2>Requires Action: {isActionRequired ? "Yes" : "No"}</h2>
      )}
    </>
  );
};

export default RocketStatus;
