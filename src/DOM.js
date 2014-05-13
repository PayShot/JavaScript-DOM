/*
 * Title         : Document Object Model
 * Author        : Ramzi Komati 
 * Version       : 1.0
 */


const NodeType = {
    ELEMENT_NODE   : 1,
    ATTRIBUTE_NODE : 2,
    TEXT_NODE      : 3,
    COMMENT_NODE   : 8,
    DOCUMENT_NODE  : 9
};

const INDENTATION = '  ';

var DOM = function DOM(name)
{
    if(typeof name === 'undefined')
    {
        name = 'html';
    }

    
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
        this.nodeName   = name;       
        this.nodeType   = type;       
        this.attributes = new Array();
        this.parent     = null;       
        this.childs     = new Array();
        this.innerHTML  = "";         
        this.text       = "";         

        // Append a new chile to the current node
        this.appendChild = function(node)
        {
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
    };

    this.doctype = '';
    this.root = new Node('html', NodeType.DOCUMENT_NODE);

    DOM.prototype.createElement = function(name, nodeType)
    {
        return new Node(name, nodeType);
    };

    DOM.prototype.appendChild = function(node)
    {
        node.parent = this;
        this.root.appendChild(node);
    };

    // Traverse the tree in level order
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

    function traverseDOM(node)
    {
        switch(node.nodeType)
        {
            case NodeType.DOCUMENT_NODE:
            case NodeType.ELEMENT_NODE:

                // Write the open tag of the node
                html += concatinate(indentation_level, INDENTATION);
                html += '<' + node.nodeName;

                // Write all the attributes of the node
                for(var i = 0; i < node.attributes.length; i++)
                {
                    html += ' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"';
                }
                html += '>\n';

                // Write the node's innerHTML
                if(node.innerHTML != '')
                {
                    html += concatinate(indentation_level + 1, INDENTATION);
                    html += node.innerHTML;
                    html += '\n';
                }

                // Traverse the node's childs
                for(var i = 0; i < node.childs.length; i++)
                {
                    indentation_level++;
                    traverseDOM(node.childs[i]);
                }
            
                // Write the close tag of the node

                html += concatinate(indentation_level, INDENTATION);

                html += '</' + node.nodeName + '>\n';
                indentation_level--;

                break;

            case NodeType.ATTRIBUTE_NODE:

                // Write the open tag of the node
                html += concatinate(indentation_level, INDENTATION);
                html += '<' + node.nodeName;

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
                html += concatinate(indentation_level, INDENTATION);
                html += '<!-- ' + node.text + ' -->\n';
                indentation_level--;
                break;

            default:

                throw new Error('Unknown node type. This error might occured when assigned a numeric value for the node name.');
        }

        function concatinate(n, str)
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