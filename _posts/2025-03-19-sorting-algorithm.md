---
title: Sorting Algorithm - 排序算法
author: WEI
date: 2025-03-19
categories: [Blogging]
tags: [Algorithm]
---

## 排序算法
排序算法是计算机科学中的一个基本问题，它旨在将一组元素按照一定的顺序排列。

排序算法可以用于各种应用场景，例如数据存储、数据分析、搜索引擎等。

本文列举了常见的排序算法，包括冒泡排序、选择排序、插入排序、希尔排序、归并排序、快速排序、堆排序和计数排序等。

## 排序可视化网站
可以通过[可视化排序算法](https://visualgo.net/zh/sorting)网站查看效果。

## 算法复杂度 {#算法复杂度}
---

| 排序算法       | 时间复杂度       | 空间复杂度 | 最好情况       | 最坏情况       |
|--------------|---------------|---------|-------------|-------------|
| [冒泡排序]       | O(n²)           | O(1)      | O(n)          | O(n²)         |
| [选择排序]       | O(n²)           | O(1)      | O(n²)         | O(n²)         |
| [插入排序]       | O(n²)           | O(1)      | O(n)          | O(n²)         |
| [希尔排序]       | O(n log n) ~ O(n²) | O(1)    | O(n log n)    | O(n²)         |
| [归并排序]       | O(n log n)      | O(n)      | O(n log n)    | O(n log n)    |
| [快速排序]       | O(n log n)      | O(log n)  | O(n log n)    | O(n²)         |
| [堆排序]         | O(n log n)      | O(1)      | O(n log n)    | O(n log n)    |
| [计数排序]       | O(n + k)        | O(k)      | O(n + k)      | O(n + k)      |

---

## 八大排序算法 {#八大排序算法}

### 1-冒泡排序
***时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)***

冒泡排序（Bubble Sort）是一种简单的排序算法，它重复地走访要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来

步骤:
1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

代码实现：

- C++

```cpp
// C++ 实现
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        bool swapped = false;
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

- C#

``` csharp
// 时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1
public static void BubbleSort(int[] arr) {
int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

- Python

```python
# 时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        swapped = False
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
```

### 2-选择排序
***时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)***

选择排序（Selection Sort）是一种简单直观的排序算法，它的基本思想是：每次从未排序的元素中选择最小的一个元素，放到已排序序列的末尾。

选择排序的主要优点在于它实现简单，并且对于小规模数据的排序效果较好。但是，由于其时间复杂度为O(n²)，因此不适用于大规模数据的排序。

选择排序的步骤如下：
1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3. 重复第二步，直到所有元素均排序完毕。

Tip : 适用于小规模数据，内存空间有限的情况

代码实现


- C++

```cpp
// 时间复杂度：O(n²) 空间复杂度：O(1)
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}
```
- C#

```csharp
// 时间复杂度：O(n²) 空间复杂度：O(1)
public static void SelectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]);
    }
}
```
- Python

```python
# 时间复杂度：O(n²) 空间复杂度：O(1)
def selection_sort(arr):
    n = len(arr)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
```

### 3-插入排序
***时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)***

插入排序（Insertion Sort）是一种简单直观的排序算法，它的基本思想是：将待排序的元素逐个插入到已排序的序列中，从而得到一个有序的序列。

插入排序的主要优点在于它实现简单，并且对于小规模数据的排序效果较好。但是，由于其时间复杂度为O(n²)，因此不适用于大规模数据的排序。

插入排序的步骤如下：
1. 首先将待排序序列的第一个元素作为已排序序列。
2. 然后从第二个元素开始，将其插入到已排序序列中。
3. 重复第二步，直到所有元素均排序完毕。

代码实现


- C++

```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```
- C#

```csharp
// 时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)
public static void InsertionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```
- Python

```python
# 时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

### 4-希尔排序
***时间复杂度：O(n²) 最好O(n) 空间复杂度：O(1)***

希尔排序（Shell Sort）是一种改进的插入排序算法，它的基本思想是：将待排序的序列分成若干个子序列，对每个子序列进行插入排序，然后逐步缩小子序列的长度，最终得到一个有序的序列。

希尔排序的主要优点在于它可以减少插入排序的比较次数和移动次数，从而提高排序的效率。但是，由于其时间复杂度为O(n²)，因此不适用于大规模数据的排序。

- 希尔排序的步骤如下：
1. 首先将待排序序列分成若干个子序列，每个子序列的长度为gap。
2. 对每个子序列进行插入排序。
3. 逐步缩小gap的长度，重复第二步，直到gap=1。

- C++

```cpp
// 时间复杂度：O(n log n) 到 O(n²) 空间复杂度：O(1)
// 适用于中等规模数据
void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}
```
- C#

```csharp
// 时间复杂度：O(n log n) 到 O(n²) 空间复杂度：O(1)
public static void ShellSort(int[] arr) {
    int n = arr.Length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}
```
- Python

```python
# 时间复杂度：O(n log n) 到 O(n²) 空间复杂度：O(1)
def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
```

### 5-归并排序
***时间复杂度：O(n log n) 空间复杂度：O(n)***

归并排序（Merge Sort）是一种基于分治思想的排序算法，它的基本思想是：将待排序的序列分成若干个子序列，对每个子序列进行排序，然后将排序好的子序列合并成一个有序的序列。

归并排序的主要优点在于它可以将两个有序的子序列合并成一个有序的序列，从而提高排序的效率。但是，由于其时间复杂度为O(n log n)，因此不适用于大规模数据的排序。

- 归并排序的步骤如下：
1. 将待排序序列分成两个子序列。
2. 对每个子序列进行归并排序。
3. 将两个有序的子序列合并成一个有序的序列。

代码实现

- C++

```cpp
// 时间复杂度：O(n log n) 空间复杂度：O(n)
// 适用于大规模数据，需要稳定排序的场景
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int p = 0; p < k; p++) {
        arr[left + p] = temp[p];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}
```
- C#

```csharp
// 时间复杂度：O(n log n) 空间复杂度：O(n)
public static void MergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    MergeSort(arr, left, mid);
    MergeSort(arr, mid + 1, right);
    Merge(arr, left, mid, right);
}

private static void Merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int p = 0; p < k; p++) {
        arr[left + p] = temp[p];
    }
}
```
- Python

```python
# 时间复杂度：O(n log n) 空间复杂度：O(n)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### 6-快速排序
***时间复杂度：O(n log n) 最坏O(n²) 空间复杂度：O(log n)***

快速排序（Quick Sort）是一种基于分治思想的排序算法，它的基本思想是：通过一趟排序将待排序序列分成两个子序列，其中一个子序列的所有元素都比另一个子序列的所有元素小，然后对这两个子序列分别进行快速排序，最终将整个序列排序。

快速排序的主要优点在于它可以将序列分成两个子序列，从而减少排序的比较次数，从而提高排序的效率。但是，由于其时间复杂度为O(n log n)，因此不适用于大规模数据的排序。

- 快速排序的步骤如下：
1. 选择一个基准元素，将序列分成两个子序列，其中一个子序列的所有元素都比基准元素小，另一个子序列的所有元素都比基准元素大。
2. 对这两个子序列分别进行快速排序。
3. 将两个子序列合并成一个有序的序列。

代码实现
- C++

```cpp
// 时间复杂度：O(n log n) 最坏O(n²) 空间复杂度：O(log n)
// 适用于大规模数据，对稳定性没有要求的场景
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```
- C#

```csharp
// 时间复杂度：O(n log n) 最坏O(n²) 空间复杂度：O(log n)
public static void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
    return i + 1;
}
```
- Python

```python
# 时间复杂度：O(n log n) 最坏O(n²) 空间复杂度：O(log n)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

### 7-堆排序
***时间复杂度：O(n log n) 空间复杂度：O(1)***

堆排序（Heap Sort）是一种基于堆数据结构的排序算法，它的基本思想是：将待排序序列构造成一个大顶堆或小顶堆，然后将堆顶元素与堆底元素交换，然后将剩余的元素重新构造成一个堆，重复上述步骤，最终得到一个有序的序列。

堆排序的主要优点在于它可以将序列分成两个子序列，从而减少排序的比较次数，从而提高排序的效率。但是，由于其时间复杂度为O(n log n)，因此不适用于大规模数据的排序。

- 堆排序的步骤如下：
1. 将待排序序列构造成一个大顶堆或小顶堆。
2. 将堆顶元素与堆底元素交换。
3. 将剩余的元素重新构造成一个堆。
4. 重复上述步骤，直到所有元素均排序完毕。

代码实现
- C++

```cpp
// 时间复杂度：O(n log n) 空间复杂度：O(1)
// 适用于大规模数据，需要原地排序的场景
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```
- C#

```csharp
// 时间复杂度：O(n log n) 空间复杂度：O(1)
public static void HeapSort(int[] arr) {
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--)
        Heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        (arr[0], arr[i]) = (arr[i], arr[0]);
        Heapify(arr, i, 0);
    }
}

private static void Heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}
```
- Python

```python
# 时间复杂度：O(n log n) 空间复杂度：O(1)
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
```

### 8-计数排序
***时间复杂度：O(n + k) 空间复杂度：O(k)***

计数排序（Counting Sort）是一种非比较排序算法，它的基本思想是：统计待排序序列中每个元素出现的次数，然后根据元素出现的次数将元素排序。

计数排序的主要优点在于它可以将序列分成两个子序列，从而减少排序的比较次数，从而提高排序的效率。但是，由于其时间复杂度为O(n + k)，因此不适用于大规模数据的排序。

- 计数排序的步骤如下：
1. 统计待排序序列中每个元素出现的次数。
2. 根据元素出现的次数将元素排序。

代码实现

- C++

```cpp
// 时间复杂度：O(n + k) 空间复杂度：O(k)
// 适用于整数排序，且数据范围不大的场景
void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;

    vector<int> count(range), output(arr.size());
    for (int i = 0; i < arr.size(); i++)
        count[arr[i] - minVal]++;

    for (int i = 1; i < count.size(); i++)
        count[i] += count[i - 1];

    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }

    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}
```
- C#

```csharp
// 时间复杂度：O(n + k) 空间复杂度：O(k)
public static void CountingSort(int[] arr) {
    int maxVal = arr.Max();
    int minVal = arr.Min();
    int range = maxVal - minVal + 1;

    int[] count = new int[range];
    int[] output = new int[arr.Length];
    for (int i = 0; i < arr.Length; i++)
        count[arr[i] - minVal]++;

    for (int i = 1; i < count.Length; i++)
        count[i] += count[i - 1];

    for (int i = arr.Length - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }

    for (int i = 0; i < arr.Length; i++)
        arr[i] = output[i];
}
```

- Python

```python
# 时间复杂度：O(n + k) 空间复杂度：O(k)
def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1

    count = [0] * range_val
    output = [0] * len(arr)

    for i in range(len(arr)):
        count[arr[i] - min_val] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1

    for i in range(len(arr)):
        arr[i] = output[i]
```
