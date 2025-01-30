 [294]
 [3052]
 [3069]
 [3046]
 [3061]
 [3007]
 [3010]
 [82]
 [54]
 [291]
 [53]
 [207]
 [272]
 [3029]
 [226]
 [36]
 [274]
 [61]
 [13]
 [227]
 [296]
 [3090]
 [55]
 [3082]
 [227]
 [3032]
 [17]
 [263]
 [3086]
 [3087]
 [91]
 [245]
 [239]
 [77]
 [204]
 [3035]
 [7]
 [3008]
 [94]
 [3036]
 [271]
 [38]
 [96]
 [3050]
 [73]
 [262]
 [273]
 [53]
 [14]
 [10]
 [80]
 [3049]
 [299]
 [3086]
 [3028]
 [3047]
 [67]
 [220]
 [3018]
 [67]
 [31]
 [100]
 [208]
 [212]
 [3018]
 [7]
 [100]
 [3021]
 [3048]
 [3008]
 [17]
 [3027]
 [24]
 [27]
 [264]
 [3067]
 [14]
 [3044]
 [269]
 [3040]
 [269]
 [222]
 [3070]
 [92]
 [3016]
 [274]
 [262]
 [3038]
 [248]
 [38]
 [64]
 [3046]
 [3032]
 [49]
 [3005]
 [3066]
 [208]
 [237]
 [235]
 [252]
 [10]
 [53]
 [219]
 [277]
 [44]
 [220]
 [232]
 [18]
 [295]
 [3036]
 [3100]
 [49]
 [229]
 [3016]
 [286]
 [269]
 [3016]
 [236]
 [3054]
 [3023]
 [100]
 [3057]
 [213]
 [34]
 [49]
 [9]
 [247]
 [219]
 [79]
 [33]
 [242]
 [3038]
 [66]
 [219]
 [3074]
 [235]
 [212]
 [3064]
 [3044]
 [37]
 [294]
 [4]
 [237]
 [66]
 [99]
 [258]
 [238]
 [232]
 [239]
 [300]
 [70]
 [212]
 [228]
 [34]
 [99]
 [25]
 [9]
 [3072]
 [3014]
 [209]
 [42]
 [296]
 [3052]
 [10]
 [27]
 [74]
 [3030]
 [245]
 [3011]
 [3099]
 [7]
 [223]
 [4]
 [233]
 [45]
 [76]
 [3084]
 [212]
 [285]
 [290]
 [85]
 [1]
 [3055]
 [3025]
 [71]
 [29]
 [3079]
 [3071]
 [5]
 [41]
 [3040]
 [3057]
 [4]
 [3090]
 [248]
 [3090]
 [38]
 [277]
 [3073]
 [3058]
 [280]
 [3005]
 [26]
 [48]
 [3038]
 [62]
 [6]
 [255]
 [3042]
 [32]
 [3031]
 [3047]
 [3038]
 [39]
 [24]
 [13]
 [49]
 [95]
 [72]
 [93]
 [217]
 [210]
 [3010]
 [50]
 [3076]
 [3043]
 [300]
 [3025]
 [254]
 [3025]
 [40]
 [95]
 [7]
 [83]
 [3074]
 [3098]
 [3040]
 [12]
 [212]
 [295]
 [256]
 [50]
 [212]
 [216]
 [6]
 [3080]
 [3017]
 [47]
 [82]
 [280]
 [54]
 [3011]
 [291]
 [3017]
 [3046]
 [201]
 [202]
 [246]
 [239]
 [49]
 [3047]
 [3012]
 [32]
 [3092]
 [82]
 [20]
 [26]
 [87]
 [3036]
 [3057]
 [31]
 [240]
 [3068]
 [225]
 [3088]
 [3091]
 [273]
 [242]
 [75]
 [3095]
 [209]
 [3043]
 [3057]
 [3093]
 [3040]
 [3006]
 [90]
 [4]
 [4]
 [89]
 [3087]
 [3072]
 [47]
 [90]
 [3007]
 [69]
 [3023]
 [3055]
 [3063]
 [34]


 const getRandomNumber = () => {
    const ranges = [
      { min: 1, max: 100 },
      { min: 201, max: 300 },
      { min: 3001, max: 3100 },
    ];
  
    // Step 1: Generate a pool of all possible numbers
    const allNumbers = [];
    ranges.forEach(range => {
      for (let i = range.min; i <= range.max; i++) {
        allNumbers.push(i);
      }
    });
  
    // Step 2: Shuffle the pool to get random numbers without repetition
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    };
  
    shuffle(allNumbers);
  
    // Return the shuffled array (can select numbers from this array without repetition)
    return allNumbers.pop(); // Use pop to select and remove the number from the pool
  };
  
  function getRandomNumbersWithoutRepetition(count) {
    const finalNumbers = [];
  
    while (finalNumbers.length < count) {
      const randomNum = getRandomNumber();
      finalNumbers.push(randomNum);
      console.log(finalNumbers);
    }
  
    return finalNumbers;
  }

  const getRandomNumber = () => {
    const ranges = [
      { min: 1, max: 100 },
      { min: 201, max: 300 },
      { min: 3001, max: 3100 },
    ];
  
    const totalNumbers = ranges.reduce((sum, range) => sum + (range.max - range.min + 1), 0);
  
    const randomIndex = Math.floor(Math.random() * totalNumbers);
  
    let cumulative = 0;
    for (const range of ranges) {
      const rangeSize = range.max - range.min + 1;
      if (randomIndex < cumulative + rangeSize) {
        return range.min + (randomIndex - cumulative);
      }
      cumulative += rangeSize;
    }
  };
  
  function getRandomNumbersWithoutRepetition(count) {
    const existingNumbers = new Set();
    const finalNumbers = [];
  
    while (finalNumbers.length < count) {
  
      const randomNum = getRandomNumber();
      if (!existingNumbers.has(randomNum)) {
        existingNumbers.add(randomNum);
        finalNumbers.push(randomNum);
        console.log(finalNumbers);
      }
    }
  
    return finalNumbers;
  }