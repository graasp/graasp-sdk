export enum AggregateBy {
  ActionType = 'actionType',
  CreatedDay = 'createdDay',
  CreatedDayOfWeek = 'createdDayOfWeek',
  CreatedTimeOfDay = 'createdTimeOfDay',
}
export enum AggregateFunction {
  Avg = 'avg',
  Count = 'count',
  Sum = 'sum',
}

export enum AggregateMetric {
  ActionCount = 'actionCount',
  User = 'user',
}

export enum CountGroupBy {
  ActionType = 'actionType',
  CreatedDay = 'createdDay',
  CreatedDayOfWeek = 'createdDayOfWeek',
  CreatedTimeOfDay = 'createdTimeOfDay',
  User = 'user',
}
