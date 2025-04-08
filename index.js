// This script generates a random array of radii, calculates various statistics, and displays the distribution of numbers in the array.
// It includes functions to calculate the sum, average, max, min, variance, standard deviation, median, and mode of the array.
// It also includes a function to display the distribution of numbers in a histogram format.
// The script uses the Math library for random number generation and array manipulation.
// Paul Saletzki
// April 8, 2025

// Generate random array of radii
function generateRandomArray (maxIter, maxRadius) {
  let radii = []

  for (let i = 0; i < maxIter; i++) {
    const radius = Math.random() * maxRadius
    radii.push(radius)
  }

  return radii
}

// Function to calculate the sum of an array
// (sum of all radii) The sum is the total of all data points.
// It is sensitive to outliers and may not represent the center of the data well if there are extreme values.
// The sum is the total of all data points. It is sensitive to outliers and may not represent the center of the data well if there are extreme values.
function sumArray (arr) {
  return arr.reduce((acc, val) => acc + val, 0)
}

// (sum of all radii / number of radii) The mean is the average of all data points.
// It is sensitive to outliers and may not represent the center of the data well if there are extreme values.
function averageArray (arr) {
  return sumArray(arr) / arr.length
}

// Max value in the array.
function maxArray (arr) {
  return Math.max(...arr)
}

// Min value in the array.
function minArray (arr) {
  return Math.min(...arr)
}

// (average of squared differences from the mean) The average of the squared differences from the mean.
// It indicates how much the data points deviate from the mean.
// A higher variance means more spread out data.
// The variance is the average of the squared differences from the mean.
// It indicates how much the data points deviate from the mean.
// A higher variance means more spread out data.
// The variance is the average of the squared differences from the mean.
// It indicates how much the data points deviate from the mean.
function varianceArray (arr) {
  const avg = averageArray(arr)
  return sumArray(arr.map(x => Math.pow(x - avg, 2))) / arr.length
}

// (square root of variance) The square root of the variance.
// It provides a measure of the average distance of each data point from the mean.
// A lower standard deviation indicates that the data points are closer to the mean.
// The standard deviation is the square root of the variance.
// It provides a measure of the average distance of each data point from the mean.
function stdDevArray (arr) {
  return Math.sqrt(varianceArray(arr))
}

// (middle value of sorted array) The middle value when data points are ordered.
// If there's an even number of observations, the median is the average of the two central numbers.
// It represents the center of the data distribution.
// The median is the middle value when data points are ordered.
// If there's an even number of observations, the median is the average of the two central numbers.
// It represents the center of the data distribution.
// The median is the middle value when data points are ordered.
function medianArray (arr) {
  const sorted = arr.slice().sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

// (most common radius) The mode is the most frequently occurring value in the array.
// It is useful for categorical data and can be used to identify the most common value in a dataset.
// The mode is the most frequently occurring value in the array.
function modeArray (arr) {
  const frequency = {}
  let maxFreq = 0
  let mode = null

  arr.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num]
      mode = num
    }
  })

  return mode
}

// Function to calculate and display distribution of numbers
function displayNumberDistribution (arr) {
  // Check if array is valid
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log('Please provide a valid non-empty array')
    return
  }

  // Filter out non-numeric values
  const numbers = arr.filter(num => typeof num === 'number' && !isNaN(num))
  if (numbers.length === 0) {
    console.log('No valid numbers found in array')
    return
  }

  // 1. Basic frequency count
  const frequency = {}
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1
  })

  // 2. Calculate basic statistics
  const min = Math.min(...numbers)
  const max = Math.max(...numbers)
  const sum = numbers.reduce((a, b) => a + b, 0)
  const mean = sum / numbers.length

  // 3. Create histogram-style distribution (buckets)
  const range = max - min
  const numBuckets = 10 // Number of buckets
  const bucketSize = range / numBuckets // bucket size per bucket
  const histogram = new Array(numBuckets).fill(0)

  numbers.forEach(num => {
    const bucketIndex = Math.min(
      Math.floor((num - min) / bucketSize),
      numBuckets - 1 // Ensure we don't exceed array bounds
    )
    histogram[bucketIndex]++
  })

  // Display results
  console.log('=== Number Distribution Analysis ===')
  // console.log(`Total numbers: ${numbers.length}`);
  // console.log(`Min value: ${min}`);
  // console.log(`Max value: ${max}`);
  // console.log(`Mean: ${mean.toFixed(2)}`);

  // console.log("\nFrequency Count:");
  // Object.entries(frequency)
  //     .sort((a, b) => Number(a[0]) - Number(b[0]))
  //     .forEach(([num, count]) => {
  //         console.log(`${num}: ${count} (${((count/numbers.length)*100).toFixed(1)}%)`);
  //     });

  console.log('\nHistogram Distribution:')
  histogram.forEach((count, index) => {
    const bucketStart = min + index * bucketSize
    const bucketEnd = bucketStart + bucketSize
    const stars = '*'.repeat(Math.round((count / numbers.length) * 200))
    console.log(
      `${bucketStart.toFixed(1)} - ${bucketEnd.toFixed(1)}: ${stars} (${count})`
    )
  })
}

function measureDistribution (arr) {
  const mean = averageArray(arr)
  const median = medianArray(arr)
  const mode = modeArray(arr)
  const variance = varianceArray(arr)
  const stdDev = stdDevArray(arr)
  const min = minArray(arr)
  const max = maxArray(arr)
  const range = max - min

  // Interquartile range (IQR) is a measure of statistical dispersion
  // It is the difference between the 75th percentile (Q3) and the 25th percentile (Q1)
  // It is a measure of the spread of the middle 50% of the data
  // It is less affected by outliers than the range
  // The IQR is calculated as:
  // IQR = Q3 - Q1
  // where Q3 is the 75th percentile and Q1 is the 25th percentile
  //arr.sort((a, b) => a - b)
  // Calculate the first and third quartiles
  const iqr =
    arr[Math.floor(0.75 * arr.length)] - arr[Math.floor(0.25 * arr.length)]

  // Skewness is a measure of the asymmetry of the distribution
  // It indicates whether the data points are skewed to the left or right
  // A positive skewness indicates a distribution with a long right tail
  // A negative skewness indicates a distribution with a long left tail
  // Skewness is calculated as the third moment of the distribution divided by the cube of the standard deviation
  // The third moment is the average of the cubed deviations from the mean
  // The formula for skewness is:
  // skewness = (1/n) * sum((x - mean)^3) / stdDev^3
  // where n is the number of data points, x is each data point, mean is the mean of the data points, and stdDev is the standard deviation of the data points
  const skewness = (3 * (mean - median)) / stdDev

  // Kurtosis is a measure of the "tailedness" of the distribution
  // It indicates the presence of outliers in the data
  // A high kurtosis indicates a distribution with heavy tails or outliers
  // A low kurtosis indicates a distribution with light tails or fewer outliers
  // Kurtosis is calculated as the fourth moment of the distribution divided by the square of the variance
  // The fourth moment is the average of the fourth power of the deviations from the mean
  // Excess kurtosis is calculated as the kurtosis minus 3
  // Excess kurtosis is a measure of the "tailedness" of the distribution
  // A positive excess kurtosis indicates a distribution with heavy tails or outliers
  // A negative excess kurtosis indicates a distribution with light tails or fewer outliers
  // The formula for excess kurtosis is:
  // kurtosis = (1/n) * sum((x - mean)^4) / variance^2 - 3
  // where n is the number of data points, x is each data point, mean is the mean of the data points, and variance is the variance of the data points
  const kurtosis = varianceArray(arr) / Math.pow(stdDev, 4) - 3 // excess kurtosis

  // Calculate z-scores
  // Z-scores are calculated as (x - mean) / stdDev
  // Z-scores indicate how many standard deviations a data point is from the mean
  // A z-score of 0 indicates the data point is exactly at the mean
  // A positive z-score indicates the data point is above the mean
  // A negative z-score indicates the data point is below the mean
  const zScores = arr.map(x => (x - mean) / stdDev) // z-scores

  // Calculate outliers using z-score method
  // Outliers are defined as points that are more than 3 standard deviations away from the mean
  // This is a common method for identifying outliers
  const outliers = arr.filter(x => Math.abs((x - mean) / stdDev) > 3)
  const outlierCount = outliers.length
  const outlierRatio = outlierCount / arr.length
  const outlierThreshold = 3 * stdDev
  const outlierLimit = mean + outlierThreshold
  const outlierLimitLow = mean - outlierThreshold
  const outlierLimitHigh = mean + outlierThreshold
  const outlierLimitLowHigh = mean - outlierThreshold
  const outlierLimitHighLow = mean + outlierThreshold
  const outlierLimitLowHighLow = mean - outlierThreshold

  return {
    mean,
    median,
    mode,
    variance,
    stdDev,
    min,
    max,
    range,
    iqr,
    skewness,
    kurtosis,
    zScores,
    outliers,
    outlierCount,
    outlierRatio,
    outlierThreshold,
    outlierLimit,
    outlierLimitLow,
    outlierLimitHigh,
    outlierLimitLowHigh,
    outlierLimitHighLow,
    outlierLimitLowHighLow
  }
}

function doAll (maxRadius, radii) {
  const maxIter = radii.length
  const distribution = measureDistribution(radii)

  console.log('Max Radius: ' + maxRadius)
  console.log('Total iterations: ' + maxIter)
  console.log('Sum of all radii: ' + sumArray(radii))
  console.log('Average sum max Radius: ' + (maxRadius / 2.0) * maxIter) // + " (max radius / 2 * iterations)");
  console.log('Average of all radii: ' + distribution.mean) // + " (sum of all radii / number of radii) The mean is the average of all data points. It is sensitive to outliers and may not represent the center of the data well if there are extreme values.");
  console.log('Median of all radii: ' + distribution.median) // + " (middle value of sorted array) The middle value when data points are ordered. If there's an even number of observations, the median is the average of the two central numbers. It represents the center of the data distribution");
  console.log('Mode of all radii: ' + distribution.mode) // + " (most common radius)");
  console.log('Variance of all radii: ' + distribution.variance) // + " (average of squared differences from the mean) The average of the squared differences from the mean. It indicates how much the data points deviate from the mean. A higher variance means more spread out data.");
  console.log('Standard deviation of all radii: ' + distribution.stdDev) // " + (square root of variance) The square root of the variance. It provides a measure of the average distance of each data point from the mean. A lower standard deviation indicates that the data points are closer to the mean.");
  console.log('Max of all radii: ' + distribution.max) // + " (largest radius)");
  console.log('Min of all radii: ' + distribution.min) // + " (smallest radius)");
  console.log('Skewness of all radii: ' + distribution.skewness) // + " (measure of asymmetry of the distribution)");
  console.log('Kurtosis of all radii: ' + distribution.kurtosis) // + " (measure of peakedness of the distribution)");

  displayNumberDistribution(radii)
}

// Main function
const maxIter = 300
const maxRadius = 5
const radii = generateRandomArray(maxIter, maxRadius)

doAll(maxRadius, radii)
