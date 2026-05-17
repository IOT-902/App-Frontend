import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
})
export class Skeleton {
  public className = input<string>();
  public animated = input<boolean>(true);

  public classes = computed(() => {
    return `
      bg-gray-200 rounded-full
      ${this.animated() ? 'animate-pulse' : ''}
      ${this.className()}
    `;
  });
}
