// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}



export function giveSessionId(sessionId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: sessionId }), 5000)
  );
}



