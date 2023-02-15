import { useEffect } from "react";
import { Task, tasksList } from "./assets/tasks/tasks";
import { Header } from "./blocks/Header/Header";
import { SolutionEditor } from "./blocks/SolutionEditor/SolutionEditor";
import { Subheader } from "./blocks/Subheader/Subheader";
import {
  LanguageType,
  setLanguage,
  toggleTheme,
} from "./store/reducers/settingsReducer";
import { setSolution } from "./store/reducers/taskReducer";
import { useAppDispatch, useAppSelector } from "./store/store";
import { checkAnswer } from "./store/thunks/checkAnswerThunk";
import { selectTask } from "./store/thunks/selectTaskThunk";

function App() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const {
    selected: selectedTask,
    tables: taskTables,
    expectedResult,
    solutionResult,
    solutionStatus,
    solution,
  } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (!selectedTask) {
      console.log("Task is not selected. The first task was selected");
      dispatch(selectTask(tasksList[0].id));
    }
  }, [selectedTask]);

  const onLanguageSelect = (new_lang: LanguageType) => {
    dispatch(setLanguage(new_lang));
  };

  const onThemeButtonClick = () => {
    dispatch(toggleTheme());
  };

  const onSelectTask = (newTask: Task["id"]) => {
    dispatch(selectTask(newTask));
  };

  const onAnswerCheck = () => {
    dispatch(checkAnswer());
  };

  const onChangeTextArea = (value: string) => {
    dispatch(setSolution(value));
  };

  return (
    <div className="flex flex-col w-full h-[100vh] items-center">
      <div className="w-full lg:container">
        <Header
          selectedLanguage={settings.language}
          onLanguageSelect={onLanguageSelect}
          selectedTheme={settings.theme}
          onThemeButtonClick={onThemeButtonClick}
          onSupportMeClick={() => {}}
        />
      </div>
      {selectedTask && (
        <>
          <div className="w-full lg:container">
            <Subheader
              selectedTask={selectedTask}
              onSelectTask={onSelectTask}
            />
          </div>
          <div className="w-full h-[calc(100vh-128px)]">
            <SolutionEditor
              selectedTask={selectedTask}
              taskTables={taskTables}
              expectedTable={expectedResult}
              userResultTable={solutionResult}
              status={solutionStatus}
              textAreaValue={solution}
              onChangeTextArea={onChangeTextArea}
              onAnswerCheck={onAnswerCheck}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
