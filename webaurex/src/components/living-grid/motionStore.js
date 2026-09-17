let progress = 0;
let pointer = { x: 0, y: 0, active: false };

const progressListeners = new Set();
const pointerListeners = new Set();

export function getLivingGridProgress() {
  return progress;
}

export function setLivingGridProgress(nextProgress) {
  progress = Math.min(1, Math.max(0, nextProgress));
  progressListeners.forEach(listener => listener(progress));
}

export function subscribeLivingGridProgress(listener) {
  progressListeners.add(listener);
  listener(progress);
  return () => progressListeners.delete(listener);
}

export function setLivingGridPointer(nextPointer) {
  pointer = nextPointer;
  pointerListeners.forEach(listener => listener(pointer));
}

export function subscribeLivingGridPointer(listener) {
  pointerListeners.add(listener);
  listener(pointer);
  return () => pointerListeners.delete(listener);
}
