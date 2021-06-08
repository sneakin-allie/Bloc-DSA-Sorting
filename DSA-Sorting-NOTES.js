// Bubble sort - the classic way not to do a sorting algorithm
// keeps looking through the array to find out whether adjacent values need swapping

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

// swap function swaps the values at 2 indices in an array
// bubbleSort function looks through adjacent pairs of values in the array
// if the values are in the wrong order, then it swaps them around and increases the swap counter


// Merge sort - divide and conquer approach to sorting
// breaks array down into continually smaller chunks, then merges them back together in the correct order

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

// slice the array into 2 halves and sort each half by recursively calling mergeSort
// 2 sorted halves are then merged together in the correct order using the merge function

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

// Quicksort - O(nlog(n)) best and average case performance, althrough O(n^2) worst case
// more commonly used than merge sort

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

// another divide and conquer approach
// partition the array into 2 halves around a pivot value
// all the values which are less than the pivot go to 1 half of the array,
// and all of the values which are greater go to the other half
// then recursively sort the 2 halves of the array until they are of length 0 or 1

// Lomuto's algorithm for partitioning

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

// the pivot is the final value in the array
// put it in place last