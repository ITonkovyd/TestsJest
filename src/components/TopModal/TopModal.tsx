import React, { useEffect, useState, ChangeEvent } from "react";

interface TopModalProps {
  autoId: number;
  setModalShow: (show: boolean) => void;
  topLevel: { top: number; expire?: string };
  langId: number;
  salonDateClosed: string;
  vin: string;
}

interface State {
  currentTop: number;
  currentTimePeriod: number;
  currentPosition: string;
  dateExpire: string;
}

interface ErrorState {
  top: boolean;
  period: boolean;
}

const TopModal: React.FC<TopModalProps> = ({ setModalShow, topLevel, langId, salonDateClosed }) => {
  const [state, setState] = useState<State>({
    currentTop: topLevel?.top > 0 ? topLevel?.top : 4,
    currentTimePeriod: topLevel?.top > 0 ? 1 : 4,
    currentPosition: "",
    dateExpire: "",
  });

  const { currentTop, currentTimePeriod, currentPosition, dateExpire } = state;
  const [error, setError] = useState<ErrorState>({ top: false, period: false });
  const [firstLoad, setFirstLoad] = useState(true);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    let value = parseInt(inputValue);
    const maxDaysToBuy = Math.ceil((new Date(salonDateClosed).getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const maxPeriod = maxDaysToBuy > 60 ? 60 : maxDaysToBuy;
    let keyToUpdate: any;

    switch (name) {
      case "levelTop":
        keyToUpdate = "currentTop";
        setError(prevState => ({ ...prevState, top: false }));
        break;
      case "timePeriod":
        keyToUpdate = "currentTimePeriod";
        value = value > maxPeriod ? maxPeriod : value;
        setError(prevState => ({ ...prevState, period: false }));
        break;
      default:
        keyToUpdate = null;
    }

    if (keyToUpdate) {
      setState(prevState => ({
        ...prevState,
        [keyToUpdate]: value > 0 ? Math.floor(value) : "",
      }));
    }
  };

  const currentDate = new Date();
  const expireDay = new Date(currentDate);
  expireDay.setDate(currentDate.getDate() + state.currentTimePeriod);

  const startHoliday = new Date(currentDate.getFullYear(), 1, 24, 0, 0, 0);
  const endHoliday = new Date(currentDate.getFullYear(), 1, 24, 23, 59, 59);
  const isHolidayDate = currentDate >= startHoliday && currentDate <= endHoliday;

  const getMonthNameShort = (month: number, langId: number) => {
    const uk = ["січ", "лют", "бер", "кві", "трав", "черв", "лип", "серп", "вер", "жовт", "лист", "груд"];
    const ru = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сент", "окт", "ноя", "дек"];

    return Number(langId) === 4 ? uk[month - 1] : ru[month - 1];
  };

  const getRandomPosition = (): Promise<{ position: string }> => {
    return new Promise(resolve => {
      const randomPosition = Math.floor(Math.random() * 100) + 1;
      setTimeout(() => {
        resolve({ position: randomPosition.toString() });
      }, 500);
    });
  };

  const getSearchPosition = () => {
    getRandomPosition().then(data => {
      setState(prevState => ({ ...prevState, currentPosition: data.position }));
    });
  };

  function datext(numeric: number, one: string, two: string, many: string): string {
    numeric = Math.abs(numeric);
    if (numeric % 100 === 1 || (numeric % 100 > 20 && numeric % 10 === 1)) return one;
    if (numeric % 100 === 2 || (numeric % 100 > 20 && numeric % 10 === 2)) return two;
    if (numeric % 100 === 3 || (numeric % 100 > 20 && numeric % 10 === 3)) return two;
    if (numeric % 100 === 4 || (numeric % 100 > 20 && numeric % 10 === 4)) return two;
    return many;
  }

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      dateExpire: topLevel?.expire
        ? topLevel?.expire.slice(8, 10) + " " + getMonthNameShort(parseInt(topLevel?.expire.slice(5, 7)), langId)
        : expireDay.getDate() + " " + getMonthNameShort(expireDay.getMonth() + 1, langId),
    }));
  }, []);

  useEffect(() => {
    if (currentTop > 0) {
      getSearchPosition();
    }
  }, [currentTop]);

  useEffect(() => {
    if (!firstLoad) {
      setState(prevState => ({
        ...prevState,
        dateExpire: expireDay.getDate() + " " + getMonthNameShort(expireDay.getMonth() + 1, langId),
      }));
    } else {
      setFirstLoad(false);
    }
  }, [currentTimePeriod]);

  const renderHolidayMessage = () => (
    <div className="mb-20 size12">
      Вам буде нарахований{" "}
      <span className="green">
        <span className="bold">ТОП {currentTimePeriod > 5 ? currentTop + 5 : currentTop}</span>-го рівня
      </span>{" "}
      на <span className="bold">{currentTimePeriod}</span> {datext(currentTimePeriod, "день", "дні", "днів")} →
      <span className="i-block">
        Це: <span className="bold">№{currentTop > 0 ? currentPosition : "..."}</span> позиція у пошуку
      </span>
    </div>
  );

  return (
    <>
      <div className="mb-10">Вкажіть рівень ТОП для підняття у пошуку</div>
      <input
        type="number"
        className={`boxed mb-15 h40 ${error.top ? "show-error" : ""}`}
        min={1}
        step={1}
        value={currentTop}
        onChange={onInputChange}
        name="levelTop"
        id="levelTop"
      />
      {error.top && <div className="red size13 error-top mb-10">Вкажіть рівень ТОП</div>}
      <div className="top_period flex f-center">
        <span className="nowrap">На період:</span>
        <div className="top_period__section">
          <input
            id="timePeriod"
            name="timePeriod"
            type="number"
            className={`top_period__input h40 bold boxed ${error.period ? "show-error" : ""}`}
            min={1}
            max={60}
            step={1}
            value={currentTimePeriod}
            onChange={onInputChange}
          />
          <label className="top_period__label bold" htmlFor="timePeriod">
            {datext(currentTimePeriod, "день", "дні", "днів")}
          </label>
        </div>

        <span className="ml-auto nowrap top_period_expire">Термін дії до {dateExpire}.</span>
      </div>
      <hr className="top_period__underline" />
      {isHolidayDate ? (
        renderHolidayMessage()
      ) : (
        <div className="mb-20 size12">
          Ви обрали:{" "}
          <span className="green">
            <span className="bold result-top">ТОП {currentTop}</span>-го рівня
          </span>{" "}
          на <span className="bold">{currentTimePeriod}</span> {datext(currentTimePeriod, "день", "дні", "днів")} →
          <span className="i-block">
            Це: <span className="bold">№{currentTop > 0 ? currentPosition : "..."}</span> позиція у пошуку
          </span>
        </div>
      )}
      <div className="bold mb-10 size18">
        До оплати: <span className="green pay-top">{currentTop * currentTimePeriod * 10} грн</span>
      </div>
      {currentTop > 0 && currentTimePeriod > 0 ? (
        <a
          href=""
          className="button button--green button--large boxed"
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              currentTop: 0,
            }));
            setModalShow(false);
          }}
          target="_blank"
        >
          До оплати
        </a>
      ) : (
        <span
          className="button button--green button--large boxed"
          onClick={() =>
            setError(
              currentTop > 0
                ? prevState => ({ ...prevState, period: true })
                : prevState => ({ ...prevState, top: true }),
            )
          }
        >
          До оплати
        </span>
      )}
    </>
  );
};

export default TopModal;
