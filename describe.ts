import { DescribeOptions } from './types.ts';

/**
 * Describes a component with options
 */
export function describe(options: DescribeOptions): DescribeOptions {
  return {
    ...options,
  };
}
