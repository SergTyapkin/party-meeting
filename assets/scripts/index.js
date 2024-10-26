const Stages = [1, 2, 3, 4, 5, 6, 7]
const localStorageName = 'finished-stages'

window.loadFinishedStages = function() {
  const finishedStages = localStorage.getItem(localStorageName);
  if (!finishedStages) {
    return [];
  }
  const finishedStagesList = JSON.parse(finishedStages);
  if (!Array.isArray(finishedStagesList)) {
    return [];
  }
  return finishedStagesList;
}

function isStageFinished(stage) {
  return loadFinishedStages().findIndex(s => s === stage) !== -1;
}

window.isAllStagesFinished = function() {
  return Stages.reduce((acc, cur) => acc && isStageFinished(cur), true)
}

window.finishStage = function(stageId) {
  const stage = Stages[stageId-1]
  if (isStageFinished(stage)) {
    return;
  }
  const finishedStages = loadFinishedStages();
  finishedStages.push(stage);
  localStorage.setItem(localStorageName, JSON.stringify(finishedStages));
}

window.clearFinishedStages = function() {
  localStorage.removeItem(localStorageName);
}
