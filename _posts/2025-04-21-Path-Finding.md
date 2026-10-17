---
title: Path Finding - 寻路算法
author: WEI
date: 2025-04-21
categories: [Blogging]
tags: [算法, 寻路]
media_subpath: /assets/img/posts/path-finding
image:
  path: cover.gif
  alt: 网格寻路动画演示
description: 常见寻路算法整理：BFS、DFS、Dijkstra、A*、Bellman-Ford、Floyd-Warshall、JPS 的原理与对比，含贪心最佳优先、双向搜索、加权 A*、IDA*、Theta*、D* Lite、SPFA、Yen、RRT、势场法以及 HPA*、CH、ALT、PRM 等进阶算法，配 Python 示例与动画演示。
---

# 寻路算法合集

> （注：文档部分内容可能由 AI 生成）

寻路算法是计算机科学中用于在图或网格中找到从起点到终点的路径的算法。本文从**基础图搜索**讲到**启发式搜索**、**动态环境重规划**、**多路径与采样规划**，再到**大规模图的加速结构**，为每个算法给出原理、难度、实用性、Python 示例和动画演示。

## 寻路算法的难度与实用性对比

### 基础与常用算法

| 算法名称 | 实现难度 | 时间复杂度 | 空间复杂度 | 实用性 | 适用场景 |
|---------|---------|-----------|-----------|-------|---------|
| [广度优先搜索(BFS)](#bfs) | ★★☆☆☆ | O(V+E) | O(V) | ★★★★☆ | 无权图最短路径、网格寻路 |
| [深度优先搜索(DFS)](#dfs) | ★★☆☆☆ | O(V+E) | O(V) | ★★★☆☆ | 迷宫生成、连通性检查 |
| [Floyd-Warshall算法](#floyd-warshall) | ★★☆☆☆ | O(V³) | O(V²) | ★★★☆☆ | 多源最短路径、稠密图 |
| [Dijkstra算法](#dijkstra) | ★★★☆☆ | O((V+E)logV) | O(V) | ★★★★★ | 带权图最短路径、导航系统 |
| [Bellman-Ford算法](#bellman-ford) | ★★★☆☆ | O(V·E) | O(V) | ★★★☆☆ | 含负权边的图 |
| [A*算法](#a-algorithm) | ★★★★☆ | 取决于启发函数 | O(V) | ★★★★★ | 游戏AI、机器人路径规划 |
| [Jump Point Search](#jump-point-search) | ★★★★★ | 优于A* | 与A*相当 | ★★★★☆ | 网格地图、游戏开发 |
| [贪心最佳优先搜索](#greedy-best-first) | ★★☆☆☆ | 最坏O(V logV+E) | O(V) | ★★★☆☆ | 快速预览、粗糙寻路 |
| [双向搜索](#bidirectional) | ★★★☆☆ | O(b^(d/2)) | O(b^(d/2)) | ★★★★☆ | 大状态空间、社交网络 |
| [加权 A*](#weighted-a-star) | ★★★☆☆ | 同A*，ε越大越快 | O(V) | ★★★★☆ | 实时游戏、快速重规划 |
| [迭代加深 A* (IDA*)](#ida-star) | ★★★★☆ | O(b^d) | O(d) | ★★★☆☆ | 内存受限的谜题求解 |
| [Theta*](#theta-star) | ★★★★☆ | 略高于A* | O(V) | ★★★★☆ | 任意角度移动、平滑路径 |
| [D* Lite](#d-star-lite) | ★★★★☆ | 重规划只算变化区域 | O(V) | ★★★★☆ | 动态环境、移动机器人 |
| [SPFA](#spfa) | ★★★☆☆ | 平均O(kE)，最坏O(V·E) | O(V) | ★★★☆☆ | 含负权边图的快速最短路 |
| [Yen 算法](#yen) | ★★★★☆ | O(K·V·(E+V logV)) | O(K·V) | ★★★☆☆ | 前 K 条备选路径 |

### 进阶与专用算法

| 算法名称 | 实现难度 | 时间复杂度 | 空间复杂度 | 实用性 | 适用场景 |
|---------|---------|-----------|-----------|-------|---------|
| [RRT](#rrt) | ★★★★☆ | 单次采样O(logV) | O(V) | ★★★★☆ | 高维运动规划、机械臂 |
| [势场法与流场](#potential-field) | ★★☆☆☆ | 每步O(1) | O(1) | ★★★☆☆ | 实时避障、群体移动 |
| [HPA*](#hpa-star) | ★★★★☆ | 远低于同图A* | O(V) | ★★★★☆ | 大世界游戏地图 |
| [Contraction Hierarchies](#contraction-hierarchies) | ★★★★★ | 查询近O(logV) | O(V+E+捷径) | ★★★★★ | 导航引擎、路线规划 |
| [ALT](#alt) | ★★★★☆ | 同A*（下界更紧） | O(L·V) | ★★★☆☆ | 增强启发式寻路 |
| [PRM](#prm) | ★★★★☆ | 预处理O(n logn) | O(V+E) | ★★★★☆ | 高维空间、机械臂规划 |

## 实用性分析

### 1. 广度优先搜索 (BFS) {#bfs}
- **实用性评分**: ★★★★☆
- **优势**: 实现简单，保证**无权图最短路径**，按层扩展，内存占用适中
- **劣势**: 不考虑边权重，在大型图中效率较低
- **权威应用**: BFS 是图论基础算法，广泛用于迷宫求解、棋盘最短路径、社交网络距离计算（如 "六度分隔"）和最小步数问题。
- **典型案例**: LeetCode 127《单词接龙》、二维网格最短路径、棋盘走法搜索。

![广度优先搜索动画演示](bfs.gif)
_广度优先搜索（BFS）：按层向四周扩展，逐层遍历_

#### BFS 示例：网格最短路径
```python
from collections import deque

def bfs_shortest_path(grid, start, target):
    rows, cols = len(grid), len(grid[0])
    directions = [(1,0),(-1,0),(0,1),(0,-1)]
    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        (x, y), dist = queue.popleft()
        if (x, y) == target:
            return dist
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == 0 and (nx, ny) not in visited:
                visited.add((nx, ny))
                queue.append(((nx, ny), dist + 1))
    return -1

# 使用示例
maze = [
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
]
print(bfs_shortest_path(maze, (0,0), (1,3)))  # 输出 4
```

### 2. Dijkstra算法 {#dijkstra}
- **实用性评分**: ★★★★★
- **优势**: 处理**带权图**效率高，结果准确，是单源最短路的工业标准
- **劣势**: 不能处理负权边，向所有方向均匀扩展，在稀疏图上可能不如启发式算法
- **权威应用**: Dijkstra 是 GPS 与网络路由中的核心算法，OSPF、Google Maps、地图服务等都基于其变体进行最短路径计算。
- **典型案例**: 道路导航、流量路由、公共交通路径规划。

![Dijkstra 算法动画演示](dijkstra.gif)
_Dijkstra：从起点出发，每次取出当前距离最小的节点并松弛其邻居_

#### Dijkstra 示例：带权图最短路径
```python
import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, node = heapq.heappop(pq)
        if d > dist[node]:
            continue
        for neighbor, weight in graph[node]:
            nd = d + weight
            if nd < dist[neighbor]:
                dist[neighbor] = nd
                heapq.heappush(pq, (nd, neighbor))
    return dist

# 使用示例
graph = {
    'A': [('B', 5), ('C', 1)],
    'B': [('A', 5), ('C', 2), ('D', 1)],
    'C': [('A', 1), ('B', 2), ('D', 4)],
    'D': [('B', 1), ('C', 4)]
}
print(dijkstra(graph, 'A'))  # 输出 {'A':0,'B':3,'C':1,'D':4}
```

### 3. A*算法 {#a-algorithm}
- **实用性评分**: ★★★★★
- **优势**: 在 Dijkstra 基础上引入**启发函数**，优先朝目标方向扩展，兼顾最优性与速度，是游戏与机器人寻路的事实标准
- **劣势**: 启发函数设计需要经验，不可采纳的启发函数（h 超过真实剩余代价）可能导致次优解
- **权威应用**: A* 被广泛用于游戏引擎（Unity、Unreal、Pathfinding.js）、机器人导航、自动驾驶车辆和实时仿真路径规划。
- **典型案例**: 游戏 AI 单位移动、机器人地图导航、地图服务中的启发式搜索。

![A* 算法动画演示](a-star.gif)
_A*：在 Dijkstra 基础上加入启发函数，优先朝目标方向扩展_

#### A* 示例：网格寻路
```python
import heapq

def heuristic(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])

def a_star(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    open_set = [(heuristic(start, goal), 0, start)]
    g_score = {start: 0}
    came_from = {}
    directions = [(1,0),(-1,0),(0,1),(0,-1)]

    while open_set:
        _, cost, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            return path[::-1]

        for dx, dy in directions:
            neighbor = (current[0]+dx, current[1]+dy)
            if (0 <= neighbor[0] < rows and 0 <= neighbor[1] < cols and grid[neighbor[0]][neighbor[1]] == 0):
                tentative_g = cost + 1
                if tentative_g < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score = tentative_g + heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score, tentative_g, neighbor))
    return None

# 使用示例
grid = [
    [0,0,0,0],
    [1,1,0,1],
    [0,0,0,0],
    [0,1,1,0]
]
print(a_star(grid, (0,0), (3,3)))
```

> 只要启发函数**不高估**真实剩余距离（可采纳），A* 就保证找到最短路径；启发函数越接近真实值，扩展的节点越少。

### 4. 深度优先搜索 (DFS) {#dfs}
- **实用性评分**: ★★★☆☆
- **优势**: 实现简单，**内存占用小**（只需保存当前路径）
- **劣势**: 不保证最短路径，可能陷入很深的无效分支
- **权威应用**: DFS 常用于拓扑排序、强连通分量、程序依赖分析、图的连通性检查、迷宫生成和搜索问题。
- **典型案例**: 拓扑排序（编译器模块依赖）、深度搜索解谜、回溯算法。

![深度优先搜索动画演示](dfs.gif)
_深度优先搜索（DFS）：沿一条路径走到底再回溯_

#### DFS 示例：图遍历与拓扑排序
```python
def dfs(graph, node, visited, result):
    visited.add(node)
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, result)
    result.append(node)

# 使用示例
graph = {
    'A': ['B','C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}
visited = set()
result = []
dfs(graph, 'A', visited, result)
print(result[::-1])  # 拓扑排序输出 ['A','C','B','D'] 或 ['A','B','C','D']
```

### 5. Bellman-Ford算法 {#bellman-ford}
- **实用性评分**: ★★★☆☆
- **优势**: 可处理**负权边**，能检测负权环，实现只有两层循环
- **劣势**: 时间复杂度高，在大型图上效率低
- **权威应用**: Bellman-Ford 是 RIP 路由协议、距离向量路由以及金融网络中负权边和货币套利检测的基础算法。
- **典型案例**: 网络路由距离向量更新、带负权边的最短路径、循环套利检测。

![Bellman-Ford 算法动画演示](bellman-ford.gif)
_Bellman-Ford：对所有边反复松弛，可处理负权边并检测负权环_

#### Bellman-Ford 示例：检测负权环
```python
def bellman_ford(edges, nodes, start):
    dist = {node: float('inf') for node in nodes}
    dist[start] = 0

    for _ in range(len(nodes) - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break

    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            raise ValueError('Negative cycle detected')
    return dist

# 使用示例
edges = [('A','B',4), ('A','C',2), ('C','B',-3), ('B','D',2)]
nodes = {'A','B','C','D'}
print(bellman_ford(edges, nodes, 'A'))
```

### 6. Floyd-Warshall算法 {#floyd-warshall}
- **实用性评分**: ★★★☆☆
- **优势**: 一次计算**所有点对最短路径**，三重循环实现简单，允许负权边
- **劣势**: 时间和空间复杂度高，不适用于大型图
- **权威应用**: Floyd-Warshall 常用于小型网络路由表预计算、地图服务距离矩阵、社交网络全对最短路径分析。
- **典型案例**: APSP（所有点对最短路径）计算、旅行时间表预处理。

![Floyd-Warshall 算法动画演示](floyd-warshall.gif)
_Floyd-Warshall：依次以每个点为中转点，更新所有点对的距离_

#### Floyd-Warshall 示例：所有点对最短路径
```python
def floyd_warshall(dist):
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist

# 使用示例
INF = float('inf')
dist = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0]
]
print(floyd_warshall(dist))
```

### 7. Jump Point Search (JPS) {#jump-point-search}
- **实用性评分**: ★★★★☆
- **优势**: 在**均匀代价网格**上比 A* 更高效，利用"跳点"跳过大量对称的冗余节点
- **劣势**: 实现复杂（邻居剪枝规则和跳点判定繁琐），仅适用于正则网格地图
- **权威应用**: JPS 在游戏开发、RTS 单位寻路、2D 网格地图路径规划中广泛应用，是 A* 网格优化的重要技术。
- **典型案例**: 实时策略游戏单位移动、tile-based 游戏地图寻路、Pathfinding.js 优化算法。

![Jump Point Search 跳跃探测动画](jps.svg)
_Jump Point Search：沿方向逐格探测，遇到强制邻居时产生跳点，中间的普通格被跳过_

#### JPS 示例：网格跳点搜索核心逻辑
```python
def in_bounds(grid, x, y):
    return 0 <= x < len(grid) and 0 <= y < len(grid[0])

def jump(grid, node, direction, goal):
    x, y = node
    dx, dy = direction
    nx, ny = x + dx, y + dy
    if not (in_bounds(grid, nx, ny) and grid[nx][ny] == 0):
        return None
    if (nx, ny) == goal:
        return (nx, ny)
    if dx != 0 and (
        (in_bounds(grid, nx, y + 1) and grid[nx][y + 1] == 1 and grid[x][y + 1] == 0)
        or (in_bounds(grid, nx, y - 1) and grid[nx][y - 1] == 1 and grid[x][y - 1] == 0)
    ):
        return (nx, ny)
    if dy != 0 and (
        (in_bounds(grid, x + 1, ny) and grid[x + 1][ny] == 1 and grid[x + 1][y] == 0)
        or (in_bounds(grid, x - 1, ny) and grid[x - 1][ny] == 1 and grid[x - 1][y] == 0)
    ):
        return (nx, ny)
    return jump(grid, (nx, ny), direction, goal)
```

> 以上示例展示了 JPS 中"跳点"检测的核心思想。完整实现还需结合 A* 的开放列表和邻居生成规则。

### 8. 贪心最佳优先搜索 (Greedy Best-First Search) {#greedy-best-first}
- **实用性评分**: ★★★☆☆
- **优势**: **只按启发值 h 排序**，扩展的节点非常少，速度极快，代码简单
- **劣势**: 完全没有 g 的约束，**不保证最短路径**，遇到凹形障碍容易被"骗"着绕远
- **权威应用**: 游戏 AI 中用于快速粗略寻路、需要即时反馈但允许路径欠优的场景。
- **典型案例**: 迷宫快速穿越、RTS 单位应急寻路、任何"先有路径再优化"的预览场景。

![贪心最佳优先搜索动画演示](greedy-best-first.svg)
_贪心最佳优先搜索：每次都挑 h 最小的格子，一路朝终点推进；好走但不是最优_

#### 贪心最佳优先搜索 示例：与 A* 只差一个 f 值
```python
import heapq

def greedy_best_first(grid, start, goal):
    def h(p):
        return abs(p[0]-goal[0]) + abs(p[1]-goal[1])

    rows, cols = len(grid), len(grid[0])
    pq = [(h(start), start)]
    came_from = {start: None}
    seen = {start}

    while pq:
        _, current = heapq.heappop(pq)
        if current == goal:
            path = []
            while current:
                path.append(current)
                current = came_from[current]
            return path[::-1]
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            n = (current[0]+dx, current[1]+dy)
            if (0 <= n[0] < rows and 0 <= n[1] < cols
                    and grid[n[0]][n[1]] == 0 and n not in seen):
                seen.add(n)
                came_from[n] = current
                heapq.heappush(pq, (h(n), n))
    return None

# 使用示例
grid = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
]
print(greedy_best_first(grid, (0, 0), (2, 3)))  # 出的路径可能绕远，不保证最短
```

### 9. 双向搜索 (Bidirectional Search) {#bidirectional}
- **实用性评分**: ★★★★☆
- **优势**: 从起点和终点**同时扩展**，分支因子 b、深度 d 时，搜索节点数从 O(b^d) 降到约 O(b^(d/2))，理论上快一个数量级
- **劣势**: 需要能做反向搜索（有向图要先建反图）；两侧相遇的判定和路径拼接要多写几行代码
- **权威应用**: 大状态空间的谜题求解、社交网络的"六度分隔"查询、导航中的双向 Dijkstra（Google 地图早期实现）。
- **典型案例**: LeetCode 127《单词接龙》的高效解法、十五数码/魔方类状态空间搜索、道路网双向扩展。

![双向搜索动画演示](bidirectional.svg)
_双向搜索：蓝色从起点、红色从终点同时按层扩展，在中点相遇后拼接路径_

#### 双向搜索 示例：双向 BFS
```python
from collections import deque

def bidirectional_bfs(graph, start, goal):
    if start == goal:
        return [start]

    front = {start: None}      # 起点侧：节点 -> 父节点
    back = {goal: None}        # 终点侧：节点 -> 父节点
    front_q, back_q = deque([start]), deque([goal])

    while front_q and back_q:
        for queue, visited, other in ((front_q, front, back), (back_q, back, front)):
            for _ in range(len(queue)):
                node = queue.popleft()
                for neighbor in graph[node]:
                    if neighbor in visited:
                        continue
                    visited[neighbor] = node
                    if neighbor in other:      # 两侧相遇
                        return join_path(front, back, neighbor)
                    queue.append(neighbor)
    return None

def join_path(front, back, meet):
    left, node = [], meet
    while node is not None:
        left.append(node)
        node = front[node]
    left.reverse()
    right, node = [], back[meet]
    while node is not None:
        right.append(node)
        node = back[node]
    return left + right

# 使用示例
graph = {
    'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['D', 'E'],
    'D': ['B', 'C', 'F'], 'E': ['C', 'F'], 'F': ['D', 'E']
}
print(bidirectional_bfs(graph, 'A', 'F'))  # 输出 ['A', 'B', 'D', 'F']
```

### 10. 加权 A* (Weighted A*) {#weighted-a-star}
- **实用性评分**: ★★★★☆
- **优势**: 只需把评估值改成 **f = g + ε·h（ε > 1）**，一行改动换来巨大加速；解的质量有上界保证——路径代价不超过最优解的 ε 倍
- **劣势**: ε 越大速度越快，但路径越可能偏离最优，需要按场景权衡（常见 ε 取 1.5~3）
- **权威应用**: 实时游戏寻路、机器人快速重规划、AnyTime 规划（如 ARA* 由它衍生，先快出解再逐步优化）。
- **典型案例**: 游戏单位需要立刻响应时的寻路、大规模地图上的快速路径估计。

![加权 A* 动画演示](weighted-a-star.gif)
_加权 A*（ε=5）：启发函数被放大后几乎直奔目标，扩展节点大幅减少_

#### 加权 A* 示例：放大启发函数
```python
import heapq

EPS = 2.5

def weighted_astar(grid, start, goal):
    def h(p):
        return abs(p[0]-goal[0]) + abs(p[1]-goal[1])

    rows, cols = len(grid), len(grid[0])
    open_set = [(h(start), 0, start)]
    g_score = {start: 0}

    while open_set:
        _, g, current = heapq.heappop(open_set)
        if current == goal:
            return g
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            n = (current[0]+dx, current[1]+dy)
            if 0 <= n[0] < rows and 0 <= n[1] < cols and grid[n[0]][n[1]] == 0:
                ng = g + 1
                if ng < g_score.get(n, float('inf')):
                    g_score[n] = ng
                    heapq.heappush(open_set, (ng + EPS * h(n), ng, n))
    return None

# 使用示例
grid = [[0] * 6 for _ in range(6)]
print(weighted_astar(grid, (0, 0), (5, 5)))  # 快速返回略超最优的路径代价
```

### 11. 迭代加深 A* (IDA*) {#ida-star}
- **实用性评分**: ★★★☆☆
- **优势**: 内存占用只有 **O(d)**（A* 需要保存所有已扩展节点），配合任意启发函数仍然保证最优；非常适合内存受限的搜索
- **劣势**: 每一轮都要**重复展开**上一轮的节点，时间开销比 A* 大；没有 visited 集合时同一状态可能被反复访问
- **权威应用**: 十五数码的标准求解器、魔方求解（Korf 的 IDA* 经典实现）、内存受限的规划与组合搜索。
- **典型案例**: 滑动谜题最优解、Rubik's Cube 两步法求解、游戏解谜关卡搜索。

![IDA* 动画演示](ida-star.svg)
_IDA*：每一轮只展开到 f 阈值为止，够不到目标就放大阈值重来，最终恰好到达目标_

#### IDA* 示例：8-puzzle 求解
```python
def ida_star(start, goal):
    def h(state):
        total = 0
        for i, x in enumerate(state):
            if x:
                j = goal.index(x)
                total += abs(i // 3 - j // 3) + abs(i % 3 - j % 3)
        return total

    def neighbors(state):
        i = state.index(0)
        r, c = divmod(i, 3)
        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < 3 and 0 <= nc < 3:
                j = nr * 3 + nc
                s = list(state)
                s[i], s[j] = s[j], s[i]
                yield tuple(s)

    def search(path, g, bound):
        node = path[-1]
        f = g + h(node)
        if f > bound:
            return f                     # 超过阈值：只回报新的下界
        if node == goal:
            return 'FOUND'
        best = float('inf')
        for move in neighbors(node):
            if move not in path:         # 避免原地往返
                path.append(move)
                t = search(path, g + 1, bound)
                if t == 'FOUND':
                    return 'FOUND'
                best = min(best, t)
                path.pop()
        return best

    start, goal = tuple(start), tuple(goal)
    bound = h(start)
    path = [start]
    while True:
        t = search(path, 0, bound)
        if t == 'FOUND':
            return path
        if t == float('inf'):
            return None
        bound = t                        # 放大阈值，进入下一轮

# 使用示例（0 表示空格）
print(ida_star((1,2,3,4,5,6,0,7,8), (1,2,3,4,5,6,7,8,0)))
```

### 12. Theta* (Any-Angle Pathfinding) {#theta-star}
- **实用性评分**: ★★★★☆
- **优势**: 允许**任意角度**的直线移动，路径比八向 A* 更短、更平滑，不需要后处理"拉直"；核心只是给父节点加一次**视线检查**
- **劣势**: 每次扩展都要做视线检查（LOS），单步开销高于 A*；地图分辨率越高，检查成本越大
- **权威应用**: 游戏单位移动（更自然的走位）、机器人导航、RTS 与塔防类游戏。
- **典型案例**: Any-Angle Pathfinding 系列研究、需要平滑路径的游戏引擎与仿真。

![Theta* 动画演示](theta-star.svg)
_Theta*：只要视线可达就直接连线，只在障碍角点处折一次，路径明显短于栅格 A*_

#### Theta* 示例：带视线检查的 A*
```python
import heapq, math

def theta_star(grid, start, goal):
    rows, cols = len(grid), len(grid[0])

    def line_of_sight(a, b):
        steps = max(abs(a[0]-b[0]), abs(a[1]-b[1])) * 2
        for i in range(1, steps):
            x = a[0] + (b[0]-a[0]) * i / steps
            y = a[1] + (b[1]-a[1]) * i / steps
            if grid[round(x)][round(y)] == 1:
                return False
        return True

    def h(p):
        return math.hypot(p[0]-goal[0], p[1]-goal[1])

    open_set = [(h(start), 0, start)]
    g_score = {start: 0}
    parent = {start: start}

    while open_set:
        _, g, current = heapq.heappop(open_set)
        if current == goal:
            path = [current]
            while parent[current] != current:
                current = parent[current]
                path.append(current)
            return path[::-1]
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)):
            n = (current[0]+dx, current[1]+dy)
            if not (0 <= n[0] < rows and 0 <= n[1] < cols and grid[n[0]][n[1]] == 0):
                continue
            grand = parent[current]
            if line_of_sight(grand, n):      # 关键：祖父与 n 可见就跳过 current
                new_g = g_score[grand] + math.hypot(grand[0]-n[0], grand[1]-n[1])
                new_parent = grand
            else:
                new_g = g + math.hypot(dx, dy)
                new_parent = current
            if new_g < g_score.get(n, float('inf')):
                g_score[n] = new_g
                parent[n] = new_parent
                heapq.heappush(open_set, (new_g + h(n), new_g, n))
    return None
```

### 13. D* Lite (D Star Lite) {#d-star-lite}
- **实用性评分**: ★★★★☆
- **优势**: **增量重规划**：地图变化后只更新受影响区域，不必从头搜索；从目标侧向机器人方向搜索，特别适合"边走边感知"的场景
- **劣势**: 实现复杂（rhs/g 双值、优先队列键管理），静态地图上相比 A* 没有优势
- **权威应用**: NASA 火星探测车（D* 系列及其变体 D* Lite）、移动机器人探索未知环境、游戏中的动态障碍处理。
- **典型案例**: 火星车自主导航、仿真机器人避障重规划、动态地图游戏单位寻路。

![D* Lite 动画演示](d-star-lite.svg)
_D* Lite：机器人沿旧路径前进，途中出现新障碍后只重算局部，给出绕行新路径_

#### D* Lite 示例：增量重规划核心骨架
```python
import heapq

INF = float('inf')

class DStarLite:
    def __init__(self, grid, start, goal):
        self.grid = grid
        self.start = start
        self.goal = goal
        self.g = {}
        self.rhs = {goal: 0}
        self.pq = []
        self.update_vertex(goal)

    def h(self, a, b):
        return abs(a[0]-b[0]) + abs(a[1]-b[1])

    def key(self, u):
        best = min(self.g.get(u, INF), self.rhs.get(u, INF))
        return (best + self.h(u, self.start), best)

    def neighbors(self, u):
        x, y = u
        return [(x+dx, y+dy) for dx, dy in ((1,0),(-1,0),(0,1),(0,-1))
                if 0 <= x+dx < len(self.grid) and 0 <= y+dy < len(self.grid[0])]

    def cost(self, u, v):
        return INF if self.grid[v[0]][v[1]] == 1 else 1

    def update_vertex(self, u):
        if u != self.goal:
            self.rhs[u] = min((self.g.get(v, INF) + self.cost(u, v)
                               for v in self.neighbors(u)), default=INF)
        if self.g.get(u, INF) != self.rhs.get(u, INF):
            heapq.heappush(self.pq, (self.key(u), u))

    def compute_shortest_path(self):
        while self.pq and (self.pq[0][0] < self.key(self.start)
                           or self.rhs.get(self.start, INF) != self.g.get(self.start, INF)):
            _, u = heapq.heappop(self.pq)
            if self.g.get(u, INF) > self.rhs.get(u, INF):
                self.g[u] = self.rhs[u]
            else:
                self.g[u] = INF
                self.update_vertex(u)
            for v in self.neighbors(u):
                self.update_vertex(v)

# 新障碍出现时：把障碍格标记为不可通行，再调用 update_vertex
# 与 compute_shortest_path，即可完成增量重规划
```

### 14. SPFA (Shortest Path Faster Algorithm) {#spfa}
- **实用性评分**: ★★★☆☆
- **优势**: Bellman-Ford 的**队列优化版**，平均快得多；保留了对负权边的支持和负环检测（入队次数 ≥ V 即有负环）
- **劣势**: 最坏仍是 **O(V·E)**，在网格图或精心构造的"菊花图"上容易被卡，竞赛中风险高
- **权威应用**: 含负权边图的快速最短路、算法竞赛教学、差分约束系统求解。
- **典型案例**: 洛谷 P3371 单源最短路、差分约束系统、负环判定。

![SPFA 动画演示](spfa.gif)
_SPFA：用队列维护"刚刚变小"的节点，被松弛成功才入队，反复迭代直到稳定_

#### SPFA 示例：队列优化的 Bellman-Ford
```python
from collections import deque

def spfa(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    in_queue = {start}
    count = {start: 1}                     # 入队次数，用于判断负环
    q = deque([start])

    while q:
        u = q.popleft()
        in_queue.discard(u)
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                count[v] = count.get(v, 0) + 1
                if count[v] > len(graph):  # 入队超过 n 次说明有负环
                    raise ValueError('Negative cycle detected')
                if v not in in_queue:
                    q.append(v)
                    in_queue.add(v)
    return dist

# 使用示例
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', -3), ('D', 2)],
    'C': [('D', 3)],
    'D': []
}
print(spfa(graph, 'A'))  # 输出 {'A': 0, 'B': 4, 'C': 1, 'D': 4}
```

### 15. Yen 算法 (K-Shortest Paths) {#yen}
- **实用性评分**: ★★★☆☆
- **优势**: 求**前 K 条无环最短路径**，贴合真实需求（备选路线、容错路由）；建立在最短路算法之上，思路清晰
- **劣势**: 每一轮都要做多次带禁用的最短路计算，K 大或图大时开销明显
- **权威应用**: 导航系统给出多条备选路线、网络路由备份方案、物流多方案规划。
- **典型案例**: Google 地图备选路线的算法基础、交通仿真中的路径选择、多方案路由。

![Yen 算法动画演示](yen.gif)
_Yen 算法（K=3）：先求第一条最短路，再在偏离点处禁用边求候选，依次凑出前 K 条_

#### Yen 算法 示例：偏离路径骨架
```python
import heapq

def dijkstra_path(graph, start, goal, banned_nodes=(), banned_edges=()):
    pq, best = [(0, [start])], {}
    while pq:
        cost, path = heapq.heappop(pq)
        node = path[-1]
        if node == goal:
            return cost, path
        if node in best:
            continue
        best[node] = cost
        for v, w in graph.get(node, []):
            if v in banned_nodes or (node, v) in banned_edges:
                continue
            heapq.heappush(pq, (cost + w, path + [v]))
    return None, None

def path_cost(graph, path):
    return sum(next(w for v, w in graph[u] if v == nxt)
               for u, nxt in zip(path, path[1:]))

def yen(graph, start, goal, K):
    A, B = [], []                              # A：已确定的前 K 短路
    cost0, first = dijkstra_path(graph, start, goal)
    if first is None:
        return []
    A.append((cost0, first))
    while len(A) < K:
        _, prev = A[-1]
        for i in range(len(prev) - 1):         # 逐个偏离点
            spur, root = prev[i], prev[:i]
            banned_nodes = {n for n in root if n != spur}
            banned_edges = {(p[i], p[i+1]) for _, p in A
                            if p[:i] == root and len(p) > i + 1}
            cost, spur_path = dijkstra_path(graph, spur, goal,
                                            banned_nodes, banned_edges)
            if spur_path is not None:
                candidate = root + spur_path
                heapq.heappush(B, (path_cost(graph, candidate), candidate))
        if not B:
            break
        A.append(heapq.heappop(B))
    return A

# 使用示例
graph = {
    'S': [('A', 1), ('B', 2)],
    'A': [('B', 1), ('G', 5)],
    'B': [('G', 4)],
    'G': []
}
print(yen(graph, 'S', 'G', 3))
```

### 16. RRT (Rapidly-exploring Random Tree) {#rrt}
- **实用性评分**: ★★★★☆
- **优势**: 面向**连续空间**：不建网格也能工作，天然支持高维与复杂运动约束；采样无穷时概率完备
- **劣势**: 基础 RRT 的路径**不最优也不平滑**（RRT* 渐近最优但慢）；狭窄通道需要大量采样
- **权威应用**: 机器人机械臂运动规划（OMPL、MoveIt）、自动驾驶轨迹生成、无人机导航。
- **典型案例**: ROS/MoveIt 中的机械臂避障规划、F1TENTH 赛车轨迹规划、太空机械臂路径设计。

![RRT 动画演示](rrt.gif)
_RRT：从起点长出一棵树，每次朝随机采样点生长一小步，均匀"探索"整个空间_

#### RRT 示例：树生长与碰撞检测
```python
import math, random

def rrt(start, goal, obstacles, step=8, max_iter=3000):
    def collision_free(a, b):
        for t in [i / 20 for i in range(21)]:
            x = a[0] + (b[0] - a[0]) * t
            y = a[1] + (b[1] - a[1]) * t
            for (cx, cy, r) in obstacles:      # 圆形障碍
                if math.hypot(x - cx, y - cy) < r:
                    return False
        return True

    nodes, parents = [start], {0: None}
    for _ in range(max_iter):
        sample = (goal if random.random() < 0.1          # 10% 概率朝目标偏置
                  else (random.uniform(0, 500), random.uniform(0, 500)))
        nearest = min(range(len(nodes)),
                      key=lambda i: math.hypot(nodes[i][0]-sample[0],
                                               nodes[i][1]-sample[1]))
        node = nodes[nearest]
        dist = math.hypot(sample[0]-node[0], sample[1]-node[1])
        if dist == 0:
            continue
        extend = min(step, dist)
        new = (node[0] + (sample[0]-node[0]) / dist * extend,
               node[1] + (sample[1]-node[1]) / dist * extend)
        if not collision_free(node, new):
            continue
        nodes.append(new)
        parents[len(nodes) - 1] = nearest
        if math.hypot(new[0]-goal[0], new[1]-goal[1]) < step:
            path, i = [goal], len(nodes) - 1
            while i is not None:
                path.append(nodes[i])
                i = parents[i]
            return path[::-1]
    return None
```

### 17. 势场法与流场 (Potential Field / Flow Field) {#potential-field}
- **实用性评分**: ★★★☆☆
- **优势**: 计算极度便宜（**每步 O(1)**），轨迹天然平滑，实时避障不需要任何全局搜索
- **劣势**: 存在**局部极小值**陷阱（U 形障碍会困住机器人），没有全局最优保证；需要随机扰动或与全局规划结合
- **权威应用**: 机器人实时避障、RTS 大规模单位移动（流场/势场）、Unity NavMesh 的局部避障（RVO 思路类似）。
- **典型案例**: 移动机器人在线避障、最高指挥官 2 等 RTS 的群体寻路、游戏单位避让。

![人工势场法动画演示](potential-field.svg)
_势场法：目标像磁铁一样吸引，障碍像弹簧一样排斥，合力方向引导平滑绕行_

#### 势场法 示例：合力方向走一步
```python
import math

def potential_field_step(pos, goal, obstacles, k_att=1.0, k_rep=800.0, d0=60.0):
    # 引力：指向目标
    fx = k_att * (goal[0] - pos[0])
    fy = k_att * (goal[1] - pos[1])
    # 斥力：障碍越近越强，超出影响半径 d0 后消失
    for (ox, oy) in obstacles:
        d = math.hypot(pos[0] - ox, pos[1] - oy)
        if 0 < d < d0:
            force = k_rep * (1 / d - 1 / d0) / d ** 2
            fx += force * (pos[0] - ox) / d
            fy += force * (pos[1] - oy) / d
    # 沿合力方向走一步
    norm = math.hypot(fx, fy)
    if norm < 1e-6:
        return pos        # 陷入局部极小，需要随机扰动或改用全局规划
    step = 2.0
    return (pos[0] + fx / norm * step, pos[1] + fy / norm * step)

# 机器人循环调用：pos = potential_field_step(pos, goal, obstacles)
```

## 进阶主题：分层加速与连续空间

上面的算法在中小型图上已经足够，但当图规模达到百万顶点，或环境是连续空间时，需要**预处理换速度**的加速结构。下面四个算法是导航与机器人领域的工业级方案。

### 18. HPA* (Hierarchical Path-Finding A*) {#hpa-star}
- **实用性评分**: ★★★★☆
- **优势**: 把地图切成**簇**分两个层级搜索，先在簇级粗搜、再在簇内细化，大图搜索可快数十倍；适合静态地图的反复查询
- **劣势**: 牺牲最优性（受簇边界入口点选择影响），需要预处理与额外内存
- **权威应用**: 大型游戏世界的单位寻路，如 Dragon Age: Origins 就使用了 HPA* 的变体。
- **典型案例**: 开放世界游戏地图、RTS 大规模地图、机器人栅格地图导航。

![HPA* 动画演示](hpa-star.svg)
_HPA*：琥珀色先在簇级粗搜出通道，青绿色再在簇内细化成具体路径_

#### HPA* 示例：两级搜索骨架
```python
# 两级搜索骨架（省略预处理细节）
def hpa_star(fine_grid, cluster_size, start, goal):
    # 预处理阶段（离线一次）：
    #   1) 把地图切成 cluster_size×cluster_size 的簇
    #   2) 找出相邻簇公共边界上的入口点，计算入口点间最短距离
    #   3) 用入口点作为节点，构建簇级抽象图
    cluster_graph, portals = build_cluster_graph(fine_grid, cluster_size)

    # 查询阶段：先在簇级粗搜，再逐段细化
    coarse = a_star(cluster_graph, cluster_of(start), cluster_of(goal))
    if coarse is None:
        return None
    path = [start]
    for c1, c2 in zip(coarse, coarse[1:]):
        portal = best_portal(portals, c1, c2, path[-1], goal)
        path += fine_a_star(fine_grid, path[-1], portal)   # 簇内细化
        path.append(portal)
    path += fine_a_star(fine_grid, path[-1], goal)
    return path
```

> 簇内搜索只在局部进行，路径在簇边界处与粗路径对齐，因此整体访问的格点远少于整图 A*。

### 19. Contraction Hierarchies（收缩分层） {#contraction-hierarchies}
- **实用性评分**: ★★★★★
- **优势**: 预处理时把"不重要"的节点逐个**收缩**并补上等价捷径，查询时只在高等级节点上搜索，毫秒级完成跨省路线计算；这是当前车载导航的主流技术
- **劣势**: 预处理耗时且占用额外空间，只适合**基本静态**的图（路况变化需要专门处理）
- **权威应用**: Google Maps、Bing Maps、OSRM 等路线规划引擎的核心加速结构。
- **典型案例**: 全国道路网秒级→毫秒级的路径查询、物流路线计算。

![收缩分层动画演示](contraction-hierarchies.svg)
_收缩分层：小点逐个被收掉并补上等价捷径，最后在稀疏枢纽图上查询并展开_

#### 收缩分层 示例：三步曲骨架
```python
from itertools import combinations

# 收缩分层三步曲（骨架）
def contraction_hierarchies(graph, source, target):
    # 1) 预处理：按重要性从小到大逐个收缩节点
    order = rank_by_importance(graph)         # 度小、局部性强、均匀性差的点先收
    for node in order:
        pairs = [(a, wa) for a, wa in graph[node] if a in graph]
        for (a, wa), (b, wb) in combinations(pairs, 2):
            if wa + wb < graph.distance(a, b):  # 补一条等价捷径
                graph.add_edge(a, b, wa + wb)
        graph.remove(node)

    # 2) 查询：从 source 与 target 同时做只向"高级"节点扩展的搜索
    up_f = upward_search(graph, source, order)
    up_b = upward_search(graph, target, order)

    # 3) 两条上行搜索在交点处合并，取最优候选
    return best_meeting_path(up_f, up_b)
```

> 关键在于"收缩顺序"：越早被收缩的节点等级越低，查询时基本不会访问它们，搜索空间被大幅剪枝。

### 20. ALT (A* + Landmarks + Triangle Inequality) {#alt}
- **实用性评分**: ★★★☆☆
- **优势**: 在 A* 里加入**路标**导出的下界：由三角不等式，`|d(L,u) − d(L,G)|` 是 u 到 G 的合法下界，多个路标取最大值即可显著减少扩展节点
- **劣势**: 每个路标需要一次全图 Dijkstra 预处理；路标选得不好（太近、太集中）效果打折
- **权威应用**: 导航与游戏引擎中增强启发函数、学术基准测试（路段图最短路）。
- **典型案例**: 大型路网查询加速、需要更强启发式剪枝的搜索场景。

![ALT 动画演示](alt.svg)
_ALT：路标 L 到各点的距离离线算好，查询时用距离之差作为剩余距离的下界_

#### ALT 示例：路标启发函数
```python
def preprocess_landmarks(graph, landmarks):
    # 每个路标各跑一次 Dijkstra，缓存所有节点到它的距离
    return {lm: dijkstra(graph, lm) for lm in landmarks}

def alt_heuristic(u, goal, lm_dist, landmarks):
    # 三角不等式：|d(lm,u) − d(lm,goal)| 是 u→goal 的安全下界
    return max(abs(lm_dist[lm][u] - lm_dist[lm][goal]) for lm in landmarks)

# 在 A* 里把 heuristic 换成 alt_heuristic 即可，多个路标取最大值
```

> 路标应互相远离并覆盖地图四周，实践中选 4~16 个就能明显减少 A* 的扩展量。

### 21. PRM (Probabilistic Roadmap) {#prm}
- **实用性评分**: ★★★★☆
- **优势**: 面向高维连续空间：**离线撒点建图，在线一次查询**即可复用；采样足够密时概率完备
- **劣势**: 狭窄通道需要大量样本才能连通；原始 PRM 路径不平滑，通常要做 shortcut 后处理
- **权威应用**: 机械臂运动规划（OMPL、MoveIt）、自动驾驶、高自由度机器人。
- **典型案例**: 六轴/七轴机械臂避障规划、车形机器人路径库、虚拟人动作规划。

![PRM 动画演示](prm.svg)
_PRM：在自由空间随机撒点并连接近邻形成路线图，查询时直接在图上搜路_

#### PRM 示例：采样、连边、查路
```python
import random, math

def build_roadmap(samples, k=5, radius=120):
    roadmap = {p: [] for p in samples}
    for p in samples:
        neighbors = sorted(samples, key=lambda q: math.hypot(p[0]-q[0], p[1]-q[1]))
        for q in neighbors[1:k+1]:             # 最近的 k 个邻居
            if math.hypot(p[0]-q[0], p[1]-q[1]) <= radius and collision_free(p, q):
                roadmap[p].append(q)
                roadmap[q].append(p)
    return roadmap

def prm(start, goal, bounds, is_free, n=500, k=5):
    samples = [start, goal]
    while len(samples) - 2 < n:                # 在自由空间均匀撒点
        p = (random.uniform(*bounds[0]), random.uniform(*bounds[1]))
        if is_free(p):
            samples.append(p)
    roadmap = build_roadmap(samples, k)
    return graph_a_star(roadmap, start, goal)  # 换成邻接表版 A*（节点=样本点）
```

> 采样越密，狭窄通道被连通的机会越大；PRM* 用随样本数增长的连接半径，可保证渐近最优。

## 实现难度分析

### 初学者适合的算法
- **BFS和DFS**: 概念简单，实现直观，是学习图算法的基础
- **贪心最佳优先搜索**: 只要会写优先队列，就能立刻跑起来
- **势场法基础版**: 几十行代码就能让机器人动起来并绕开障碍

### 中等难度的算法
- **Dijkstra优化版**: 需要理解优先队列和松弛操作
- **Bellman-Ford / SPFA**: 需要理解动态规划与队列优化思想
- **Floyd-Warshall**: 三重循环实现简单，但理解其原理需要一定基础
- **双向搜索、加权 A***: 在已有算法上小改，性价比极高
- **IDA***: 迭代加深 + 启发阈值的组合，需要理解重复展开的取舍
- **Theta***: 需要理解视线检查与父节点更新的细节
- **Yen 算法**: 最短路 + 偏离路径的工程实现，细节较多

### 高难度的算法
- **A*算法**: 需要设计合适的启发函数，调参经验要求高
- **Jump Point Search**: 概念复杂，边界情况处理繁琐
- **D* Lite**: rhs/g 双值与增量维护，实现和调试都不容易
- **RRT**: 采样与碰撞检测工程量大，参数（步长、偏置）影响明显
- **HPA*、Contraction Hierarchies、ALT、PRM**: 预处理、排序策略与数据结构复杂，偏工程与研究性质

## 选择合适的寻路算法

选择寻路算法时，应考虑以下因素：
1. **问题规模**: 大型图可能需要考虑空间和时间效率更高的算法（HPA*、CH）
2. **图的特性**: 是否有负权边、是否为网格地图、有没有权值
3. **动态程度**: 环境频繁变化优先考虑 D* Lite 等增量算法
4. **空间类型**: 连续空间/高自由度考虑 RRT、PRM 或势场法
5. **精确度要求**: 是否必须找到最短路径，能否接受 ε-最优
6. **实现复杂度**: 根据开发团队能力和时间限制选择
7. **性能需求**: 实时应用可能需要更高效的算法

在实际应用中，往往会根据具体场景对这些算法进行优化和改进，甚至结合多种算法的优点创建混合算法。

## 交互式案例与可视化资源

以下资源可以帮助你通过动态图示、步骤演示或在线运行来理解每个算法：

- Algorithm Visualizer 图搜索演示：https://algorithm-visualizer.org
  - 提供逐步执行和动画展示，适合对比 BFS、DFS、Dijkstra、A* 的搜索过程。
- PathFinding.js 可视化演示：https://qiao.github.io/PathFinding.js/visual/
  - 在线网格寻路示例，支持 A*、Dijkstra、BFS、Jump Point Search 等算法。
- 图算法动画（USFCA，作者 David Galles）：https://www.cs.usfca.edu/~galles/visualization/Algorithms.html
  - 包含 BFS、DFS、Dijkstra、Floyd-Warshall 等算法的动画演示。
- Red Blob Games A* 教程：https://www.redblobgames.com/pathfinding/a-star/introduction.html
  - 详细解释启发式搜索原理，并配有可交互演示。
- A* Pathfinding Project（游戏寻路工具）：https://arongranberg.com/astar/
  - 专注于游戏和实时寻路的 A* 与 JPS 实现与案例。

### 推荐使用方式
1. 先在 VisuAlgo 或 Algorithm Visualizer 中观察算法展开节点的顺序。
2. 使用 PathFinding.js 在线调节起点、终点和障碍，查看网格寻路结果。
3. 阅读 Red Blob Games 的 A* 讲解，配合在线演示加深启发函数概念。
4. 如果想要游戏级别的优化，参考 A* Pathfinding Project 的 JPS 及 A* 引擎实现。

> 这些网站既可以作为课堂演示材料，也适合自己逐步调试、观察每一步算法的运行过程。

---

## 图片来源

文中的算法动画来自 [Wikimedia Commons](https://commons.wikimedia.org/)，按原作者的许可使用（部分动图经过缩放、压缩处理），作者与许可如下：

- BFS：[Breadth-First-Search-Algorithm.gif](https://commons.wikimedia.org/wiki/File:Breadth-First-Search-Algorithm.gif)，作者 Mre，CC BY-SA 3.0
- DFS：[Depth-First-Search.gif](https://commons.wikimedia.org/wiki/File:Depth-First-Search.gif)，作者 Mre，CC BY-SA 3.0
- Floyd-Warshall：[Floyd warshall gif.gif](https://commons.wikimedia.org/wiki/File:Floyd_warshall_gif.gif)，作者 GER2000，CC BY-SA 4.0
- Dijkstra：[Dijkstra Animation.gif](https://commons.wikimedia.org/wiki/File:Dijkstra_Animation.gif)，作者 Ibmua，Public domain
- Bellman-Ford：[Bellman-Ford.gif](https://commons.wikimedia.org/wiki/File:Bellman-Ford.gif)，作者 Mohammad444t，CC BY-SA 4.0
- A*：[Astar progress animation.gif](https://commons.wikimedia.org/wiki/File:Astar_progress_animation.gif)，作者 Subh83，CC BY 3.0
- 加权 A*：[Weighted A star with eps 5.gif](https://commons.wikimedia.org/wiki/File:Weighted_A_star_with_eps_5.gif)，作者 Subh83，CC BY 3.0
- SPFA：[SPFADemo.gif](https://commons.wikimedia.org/wiki/File:SPFADemo.gif)，作者 Shiyu Ji，CC BY-SA 4.0
- Yen（K 短路）：[Yen's K-Shortest Path Algorithm, K=3, A to F.gif](https://commons.wikimedia.org/wiki/File:Yen%27s_K-Shortest_Path_Algorithm,_K%3D3,_A_to_F.gif)，作者 KRPent，CC BY-SA 3.0
- RRT：[Rapidly-exploring Random Tree (RRT) 500x373.gif](https://commons.wikimedia.org/wiki/File:Rapidly-exploring_Random_Tree_(RRT)_500x373.gif)，作者 Javed Hossain，CC BY-SA 3.0
- 封面：[BFS (Breadth First Search) for pathfinding.gif](https://commons.wikimedia.org/wiki/File:BFS_(Breadth_First_Search)_for_pathfinding.gif)，作者 Mohammad444t，CC BY-SA 4.0

其中以下动画为**本文自绘**（内联 SVG）：JPS、贪心最佳优先搜索、双向搜索、IDA*、Theta*、D* Lite、势场法与流场、HPA*、Contraction Hierarchies、ALT、PRM（Wikimedia 上暂无对应算法的动图）。
