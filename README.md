# RandomDistribution_JS
Generate random numbers and calculate the distribution of those numbers

This code came about due to the witnessing of a clustering of values in a set of random numbers generated.  So, I set about to write code to generate the random numbers and calculate the distribution values and histogram of those numbers to measure the distribution of the numbers.  This is in response to the video done by Robot Robby:  https://www.youtube.com/watch?v=GL0HAJ8xjww

In this video he creates three.js code to generate 300 randomly dispursed cubes.  It was witnessed that the distribution of the cubes seemed to follow a clustering along an axis. 

I found it interesting and investigated to see the distribution of the numbers.

Code:
The code generates 300 random numbers and multiplies by 5, just some number to give it some dimension. 
Then the code calculates many parameters such as mean, standard deviation, skewness, etc.. to measure the distribution of the 300 randomly generated numbers.
Finally a histogram is generated to show the distribution on the terminal.

I use Node.js to compile the code in the terminal
'''terminal
$ node index.js
'''
Outputs:...
'''terminal
Max Radius: 5
Total iterations: 300
Sum of all radii: 789.6619573334558
Average sum max Radius: 750
Average of all radii: 2.6322065244448525
Median of all radii: 2.7191281486546237
Mode of all radii: 1.5945217434443648
Variance of all radii: 2.179606829957246
Standard deviation of all radii: 1.47634915584263
Max of all radii: 4.970876702435708
Min of all radii: 0.001288095483139573
Skewness of all radii: -0.17662818554631238
Kurtosis of all radii: -2.541201657906525
=== Number Distribution Analysis ===

Histogram Distribution:
0.0 - 0.5: ******************* (28)
0.5 - 1.0: ************************ (36)
1.0 - 1.5: ********* (14)
1.5 - 2.0: **************** (24)
2.0 - 2.5: *********************** (35)
2.5 - 3.0: ******************* (28)
3.0 - 3.5: ******************** (30)
3.5 - 4.0: ********************* (32)
4.0 - 4.5: ************************ (36)
4.5 - 5.0: ************************* (37)
'''
