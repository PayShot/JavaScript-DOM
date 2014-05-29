/*
 * Title         : JavaScript Linked List
 * Author        : Ramzi Komati 
 * Source        : https://github.com/ramzikomati/JavaScript-LinkedList
 */

var LinkedList = function(array) 
{
    // Declare Linked List's attributes.
    var first, last;
    var count = 0;
    var Node = function(value) 
    {
        this.value = value;
        var next = {};
    };

    // Add a new item at the end of the linked list.
    this.push = function(value) 
    {
        var node = new Node(value);
        if(first == null){
            first = last = node;
        }
        else {
            last.next = node;
            last = node;
        }
        count++;
    };

    // Add a new item to a specified index. 
    // Return 'true' if a new item has been added successfully.
    this.add = function(value, index)
    {
        if(index > count || index < 0) 
        {
            return false;
        }
        else 
        {
            var i = 0;
            var current = first, previous, next;
            var node = new Node(value);

            if(first == null) 
            {
                first = last = node;
            }
            else 
            {
                if(index === 0) 
                {
                    // Handle special case - first node
                    node.next = first;
                    first = node;
                }
                else 
                {
                    while(i++ < index) 
                    {
                        // Set previous to first node
                        previous = current;

                        // Set current to the next one
                        current = current.next;
                    }
                    previous.next = node;
                    node.next = current;
                }
            }
            count++;
            return true;
        }
    }

    // Alter an item from a specified index.
    // Return 'true' if the item has been altered.
    this.replace = function(value, index) 
    {
        if(index > count || index < 0) 
        {
            return false;
        }
        else 
        {
            this.add(value, index)
            this.remove(++index)
            return true;
        }
    }


    // Return the first item of the linked list and remove it. 
    // Return 'undefined' when list is empty.
    this.pop = function() 
    {
        if(count > 0) {
            var value = first;
            first = first.next;
            count--;
            return value;
        }
        else {
            return undefined;
        }
    };

    // Remove an item from the linked list that corresponds with a specified index. 
    // Return 'true' if a new item has been removed successfully.
    this.remove = function(index) 
    {
        if(index >= count || index < 0) 
        {
            return false;
        }
        else
        {
            var i = 0;
            var current = first, previous;
            if(index === 0) {
                // Handle special case - first node
                first = current.next;
            }
            else {
                while(i++ < index) {
                    // Set previous to first node
                    previous = current;
                    // Set current to the next one
                    current = current.next;
                }
                // Skip to the next node
                previous.next = current.next;
            }
            count--;
            return current.value;
        }
    };

    // Return an item from the linked list that corresponds with a specified index.
    // Return 'undefined' if index outbound the list's length.
    this.item = function(index) 
    {
        if(index < count ) {
            var i = 0;
            var current = first;
            
            while(i++ < index) {
                // Traverse the list until the i-th item is reached
                current = current.next;
            }
            
            return current.value;
        }
        else {
            return undefined;
        }
    };

    // Return the length of the linked list.
    this.length = function() 
    {
        return count;
    };

    // Convert the array to a linked list.
    if(array instanceof Array) 
    {
        for(var i=0; i<array.length; i++) {
            this.push(array[i]);
        }
    }
};