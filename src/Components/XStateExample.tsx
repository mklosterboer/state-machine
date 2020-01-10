import React from 'react';
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";


const dogFetcherMachine = Machine({
    id: "dog fetcher",
    initial: "idle",
    context: {
        dog: null,
        error: null
    },
    states: {
        idle: {
            on: { FETCH: "loading" }
        },
        loading: {
            invoke: {
                src: () => fetchRandomDog(),
                onDone: {
                    target: "success",
                    actions: assign({ dog: (_, event) => (event as any).data.message })
                } as any,
                onError: {
                    target: "failure",
                    actions: assign({ error: (_, event) => (event as any).data })
                } as any
            },
            on: { CANCEL: "idle" }
        },
        success: {
            on: { FETCH: "loading" }
        },
        failure: {
            on: { FETCH: "loading" }
        }
    }
});

function fetchRandomDog() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const fail = Math.random() < 0.1;

            if (fail) {
                rej("Failed");
            } else {
                fetch(`https://dog.ceo/api/breeds/image/random`)
                    .then(data => data.json())
                    .then(data => {
                        console.log(data);
                        res(data);
                    });
            }
        }, 1000);
    });
}

function DogFetcher() {
  const [current, send] = useMachine(dogFetcherMachine);
  const { error, dog } = current.context as any;

  return (
    <div>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <figure className="dog" onDoubleClick={() => send("FETCH")}>
        {dog && <img src={dog} alt="doggo" />}
      </figure>

      <button onClick={() => send("FETCH")}>
        {current.matches("loading") && "Fetching..."}
        {current.matches("success") && "Fetch another dog!"}
        {current.matches("idle") && "Fetch dog"}
        {current.matches("failure") && "Try again"}
      </button>
      <button onClick={() => send("CANCEL")}>Cancel</button>
    </div>
  );
}

export default DogFetcher;