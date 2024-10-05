import { DescribeOptions } from './types.ts';


export function describe(options: DescribeOptions): DescribeOptions {
  return {
    ...options,
  };
}
