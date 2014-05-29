/*
 * Title   : Document Object Model
 * Author  : Ramzi Komati 
 */

const NodeType = {
    ELEMENT_NODE   : 1,
    ATTRIBUTE_NODE : 2,
    TEXT_NODE      : 3,
    COMMENT_NODE   : 8,
    DOCUMENT_NODE  : 9
};

const INDENTATION = '  ';

var DOM = function DOM()
{
    var html = '',
        indentation_level = 0;

    var Node = function Node(name, type)
    {
        // Validate or manipulate arguments
        if(typeof name === 'number')
        {
            type = name;
        }
        if(typeof name === 'undefined')
        {
            throw new Error('Cannot create new node. Node name is missing.');
        }
        if(typeof type === 'undefined')
        {
            type = NodeType.ELEMENT_NODE;
        }

        // Declare public methods
        this.id         = '';
        this.className  = '';
        this.nodeName   = name;
        this.nodeType   = type;
        this.attributes = new Array();
        this.parent     = null;
        this.childs     = new LinkedList();
        this.innerHTML  = '';
        this.text       = '';

        // Append a new chile to the current node
        this.appendChild = function(node)
        {
            node.parent = this;
            this.childs.push(node);
        };

        // Set attribute to the current node
        this.setAttribute = function(name, value)
        {
            this.attributes.push({
                'name'  : name,
                'value' : value
            });
        };

        // Get attribute of the current node
        this.getAttribute = function(name)
        {
            for(var i = 0; i < this.attributes.length; i++)
            {
                if(this.attributes[i].name == name)
                {
                    return this.attributes[i];
                }
            }

            // Return -1 if the attribute is not found
            return -1;
        };

        // Replace innerHTML in node and it's childs
        this.replace = function(subStr, newSubStr)
        {
            this.innerHTML = this.innerHTML.replace(subStr, newSubStr);
            for(var i = 0; i < this.childs.length(); i++)
            {
                this.childs.item(i).replace(subStr, newSubStr);
            }
        };

        // Returns the node that contain a substring in it's innerHTML
        // Returns -1 if the node was not found.
        this.nodeOf = function(subStr)
        {
            if(this.innerHTML.indexOf(subStr) > -1)
            {
                return this;
            }
            else
            {
                for(var i = 0; i < this.childs.length(); i++)
                {
                    if(this.childs.item(i).innerHTML.indexOf(subStr) > -1)
                    {
                        return this.childs.item(i);
                    }
                    else
                    {
                        this.childs.item(i).nodeOf(subStr);
                    }
                }
                return -1;
            }
        };

        // Split a node into two and add a new node in between
        this.split = function(index, node)
        {
            for(var i = 0; i < this.parent.childs.length(); i++)
            {
                if(this.parent.childs.item(i) == this)
                {
                    // Add the new node
                    this.parent.childs.add(node, i + 1);

                    // Add the next node
                    var nextNode = new Node(this.nodeName);
                    nextNode.innerHTML = this.innerHTML.substr(index, this.innerHTML.length);
                    this.parent.childs.add(nextNode, i + 2)
                    
                    // Edit the content of the current node
                    this.innerHTML = this.innerHTML.substr(0, index);

                    // Break the loop
                    break;
                }
            }
        };
    };

    this.doctype = '';
    this.root = new Node(NodeType.DOCUMENT_NODE);

    this.createElement = function(name, nodeType)
    {
        return new Node(name, nodeType);
    };

    this.appendChild = function(node)
    {
        if(node instanceof DOM)
        {
            var dom = node;
            for(var i = 0; i < dom.root.childs.length(); i++)
            {
                dom.root.childs.item(i).parent = this;
                this.root.appendChild(dom.root.childs.item(i));
            }
        }
        else
        {
            node.parent = this;
            this.root.appendChild(node);
        }
    };

    // Convert the tree to HTML
    this.toString = function(node)
    {
        if(this.doctype == '')
        {
            html = '';
        }
        else
        {
            html = this.doctype + '\n';
        }

        if(typeof node === 'undefined')
        {
            node = this.root;
        }

        traverseDOM(node);
        return html;
    };

    // Traverse the tree in level order
    function traverseDOM(node)
    {
        switch(node.nodeType)
        {
            case NodeType.DOCUMENT_NODE:
            
                // Traverse the node's childs
                for(var i = 0; i < node.childs.length(); i++)
                {
                    indentation_level++;
                    traverseDOM(node.childs.item(i));
                }
                break;

            case NodeType.ELEMENT_NODE:

                // Write the open tag of the node
                html += concatenate(indentation_level, INDENTATION);
                html += '<' + node.nodeName;

                // Write the element ID
                if(node.id != '')
                {
                    html += ' id="' + node.id + '"';
                }

                // Write the element class name
                if(node.className != '')
                {
                    html += ' class="' + node.className + '"';
                }
                // Write all the attributes of the node
                for(var i = 0; i < node.attributes.length; i++)
                {
                    html += ' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"';
                }
                html += '>\n';

                // Write the node's innerHTML
                if(node.innerHTML != '')
                {
                    html += concatenate(indentation_level + 1, INDENTATION);
                    html += node.innerHTML;
                    html += '\n';
                }

                // Traverse the node's childs
                for(var i = 0; i < node.childs.length(); i++)
                {
                    indentation_level++;
                    traverseDOM(node.childs.item(i));
                }
            
                // Write the close tag of the node

                html += concatenate(indentation_level, INDENTATION);

                html += '</' + node.nodeName + '>\n';
                indentation_level--;

                break;

            case NodeType.ATTRIBUTE_NODE:

                // Write the open tag of the node
                html += concatenate(indentation_level, INDENTATION);
                html += '<' + node.nodeName;

                // Write the element ID
                if(node.id != '')
                {
                    html += ' id="' + node.id + '"';
                }

                // Write the element class name
                if(node.className != '')
                {
                    html += ' class="' + node.className + '"';
                }
                // Write all the attributes of the node
                for(var i = 0; i < node.attributes.length; i++)
                {
                    html += ' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"';
                }
                html += '/>\n';
                indentation_level--;
                break;

            case NodeType.TEXT_NODE:

                break;

            case NodeType.COMMENT_NODE:

                // Write the open tag of the node
                html += concatenate(indentation_level, INDENTATION);
                html += '<!-- ' + node.text + ' -->\n';
                indentation_level--;
                break;

            default:

                throw new Error('Unknown node type. This error might occured when assigned a numeric value for the node name.');
        }

        function concatenate(n, str)
        {
            var result = new Array();
            for(var i = 0; i < n; i++)
            {
                result.push(str);
            }
            return result.join('');
        }
    }
};