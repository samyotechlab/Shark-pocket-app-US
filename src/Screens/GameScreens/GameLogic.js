import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';


export const useGameLogic = () => {
  const route = useRoute();
  const routeData = route.params;

  const [number, setNumber] = useState([]);
  const [numberStringData, setNumberString] = useState('');
  const [superNumberCount, setSuperNumberCount] = useState(0);
  const [matchingSuperNumbers, setMatchingSuperNumbers] = useState([]);
  const [primeCount, setPrimeCount] = useState(0);

  const [realNumber, setRealNumber] = useState([]);
  const [oddCounts, setOddCounts] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });
  const [evenCounts, setEvenCounts] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });
  const [totalOddCount, setTotalOddCount] = useState(0);
  const [negativePoint, setNegativePoint] = useState(0);

  const superNumber = routeData.selectedNumber;

  const isPrime = num => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getOddCount = len => {
    setOddCounts(prev => {
      const updated = {...prev};
      if (len === 1) updated.one++;
      else if (len === 2) updated.two++;
      else if (len === 3) updated.three++;
      else if (len === 4) updated.four++;
      return updated;
    });
  };

  const getEvenCount = len => {
    setEvenCounts(prev => {
      const updated = {...prev};
      if (len === 1) updated.one++;
      else if (len === 2) updated.two++;
      else if (len === 3) updated.three++;
      else if (len === 4) updated.four++;
      return updated;
    });
  };

  const calculateScores = () => {
    const totalOddCount = Object.values(oddCounts).reduce(
      (sum, count) => sum + count,
      0,
    );
    setTotalOddCount(totalOddCount);

    const bonusPoints =
      totalOddCount >= 100
        ? 50
        : totalOddCount >= 70
        ? 30
        : totalOddCount >= 30
        ? 20
        : totalOddCount >= 10
        ? 10
        : 0;

    const superPoints =
      superNumberCount >= 20
        ? 40
        : superNumberCount >= 10
        ? 20
        : superNumberCount >= 5
        ? 10
        : 0;

    const oddNumberScore =
      oddCounts.two * 2 + oddCounts.three * 3 + oddCounts.four * 4;

    const negativeScore =
      evenCounts.two * 0.3 + evenCounts.three * 0.45 + evenCounts.four * 0.6;
    setNegativePoint(negativeScore);

    const superNumberScore = superNumberCount * 5;
    const primeScore = primeCount * 10;

    return (
      oddNumberScore -
      negativeScore +
      superNumberScore +
      primeScore +
      bonusPoints +
      superPoints
    );
  };

  const handleNumberClick = num => {
    const strNum = String(num);

    setNumber(prev => [...prev, num]);
    setNumberString(prev => (prev ? `${prev},${num}` : `${num}`));

    const len = strNum.length;

    if (num % 2 !== 0) {
      setRealNumber(prev => [...prev, num]);
      getOddCount(len);

      if (len > 1 && parseInt(strNum.slice(-1)) === superNumber) {
        setSuperNumberCount(count => count + 1);
        setMatchingSuperNumbers(prev => [...prev, num]);
      }
      if (isPrime(num)) {
        setPrimeCount(count => count + 1);
      }
    } else {
      getEvenCount(len);
    }

    return calculateScores();
  };

  return {
    handleNumberClick,
    primeCount,
    oddCounts,
    superNumberCount,
    negativePoint,
    numberStringData,
  };
};
