# 코딩 테스트

```
$ npm i
$ npm run test
```

## API

- `getResultList(items, queries)`: 아이템들에 대한 필터 및 정렬 조건을 정의한 queries을 적용될 items와 함께 넘기면, 각 query에 따른 결과가 나온다.

## Item

```js
const item = {
  필드명: 값 // 필드명: 값 형태로 자유롭게 정의하면된다. 이를 query에 잘 명시해주면 그에따라 적용되어 결과가 나온다.
};
```

## Query

```js
const query = {
  include: ["id:1", "name:김관덕"], // and 조건. 여기에 명시된 필드의 값을 가진 경우에만 결과에 포함된다.
  exclude: ["id:4"], // and 조건. 여기에 명시된 필드의 값을 가진경우 결과에서 제외된다.
  sortBy: ["id:desc", "name:asc"] // 배열의 앞쪽에 위치한 조건일수록 정렬 우선순위가 높다. asc은 오름차순, desc은 내림차순이다.
};
```

## Sample Usage

```js
const items = [
  {
    id: 1,
    name: "사과",
    type: "과일"
  },
  {
    id: 2,
    name: "바나나",
    type: "과일"
  },
  {
    id: 3,
    name: "오이",
    type: "야채"
  }
];

const queries = [
  {
    include: ["type": "과일"],
    exclude: [],
    orderBy: ["id:desc"]
  },
  {
    include: [],
    exclude: ["type": "야채"],
    orderBy: ["name:asc"]
  },
]

console.log(getResultList(items, queires));
// => [
//   [ { id: 2, ... }, { id: 1, ... } ],
//   [ { name: 바나나, ... }, { name: 사과, ... } ]
// ]
```
