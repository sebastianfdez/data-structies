export default class MinHeap {
    constructor () {
        // Always first node is null [null, 1, 4, 5 ....]
        /** @type {number[]} nodes list */
        this.minheap = [null];
        /** @type {number} size of the heap */
        this.size = 0;
    }
    /* Get value of the head of the heap */
    getHead() {
        return this.minheap[1]
    }
    /**
     * Change position of two nodes
     * @param {number} firstItemIndex 
     * @param {number} lastItemInde 
     */
    swap(firstItemIndex, lastItemInde) {
        const tmp = this.minheap[firstItemIndex];
        this.minheap[firstItemIndex] = this.minheap[lastItemInde];
        this.minheap[lastItemInde] = tmp;
    }
    /**
     * Recover the heap property from one node to its childs
     * @param {number} i 
     */
    heapify(i) {
        let index, leftChild, righChild;
        while(i < this.size) {
            index = i;
            leftChild = 2*i;
            righChild = leftChild + 1;
            // Get the smallest children
            if (leftChild <= this.size && this.minheap[leftChild] > this.minheap[index]) {
                index = leftChild;
            }
            if (righChild <= this.size && this.minheap[righChild] > this.minheap[index]) {
                index = righChild;
            }
            // Children are bigger than actual node
            if (index == i) {
                return;
            }
            swap(i, index);
            i = index;
        }
    }
    /**
     * Return the smalles value of the heap O(N)
     * @return {number}
     */
    remove() {
        /* Smallest element is at the index 1 in the heap array */
        let smallest = this.minheap[1]
        this.minheap[1] = this.minheap[this.size];
        this.minheap[this.size] = null;
        this.size--;
        this.heapify(1);
        return smallest;
    }

    /**
     * Insert node to the heap. O(N)
     * @param {number} node 
     */
    insert(node) {
        this.minheap.push(node);
        this.size++;
        let parent = Math.floor(this.size/2);
        let index = this.size;
        while (node < this.minheap[parent] && parent > 0) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor(index/2);
        }
    }

    toJSON() {
        const structure = {};
        structure['leaves'] = {};
        structure.leaves.keys = [this.minheap[1]];
        structure.children = this.appendChildren(1);
        return structure;
    }

    appendChildren(i) {
        const children = [];
        if (2*i <= this.size) {
            const node = {};
            node['leaves'] = {};
            node.leaves.keys = [this.minheap[2*i]];
            node.children = this.appendChildren(2*i);
            children.push(node);
        }
        if (2*i + 1 <= this.size) {
            const node = {};
            node['leaves'] = {};
            node.leaves.keys = [this.minheap[2*i + 1]];
            node.children = this.appendChildren(2*i + 1);
            children.push(node);
        }
        return children;
    }
}
