Web Frontend Software Engineer: Assignment

“Spectrum”, the launch vehicle built by Isar Aerospace just performed a successful lift-off from the launch pad and is flying towards Earth orbit. A web service provides live insights into Spectrum’s sensor system during its maiden flight. Your task is to visualize these sensor values in a web interface so that the crew in ground control can check if everything is okay.

To run this project, run the following commands in the terminal:

1. npm i
2. npm run dev

Task 1:

in main.tsx file comment out the App2 component and add App component

Task 2:

in main.tsx file comment out the App component and add App2 component

Task 3:

Please comment on potential improvements of the API structure, deviations from common standards or performance enhancements.

answer:

1. adding pause/continue API options for better communication via the websocket when action is required
2. making actOnSpectrum API of type POST/PUT
3. preserve consistency: I would try to make the data keys coming from the APIs as lower case (in the first API endpoint velocity, altitiude, temperature are lower case and in the second these keys are coming back as capitalized)
4. add timestamps to the objects coming back from the API
5. adding authentication headers for security.
