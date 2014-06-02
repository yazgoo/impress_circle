function impress_circle()
{
    function parse_circles()
    {
        var divs = document.getElementsByClassName('circle');
        var circles = [];
        for(var i = 0; i < divs.length; i++)
        {
            var div = divs[i];
            var circle = {};
            for(var j = 0; j < div.children.length; j++)
            {
                var section = div.children[j];
                var section_name = section.getAttribute("data-name")
                circle[section_name] = {}
                circle[section_name]["sections"] = {}
                for(var k = 0; k < section.children.length; k++)
                {
                    var subsection = section.children[k];
                    var subsection_name = 
                        subsection.getAttribute("data-name");
                    circle[section_name]["sections"][subsection_name] =
                        subsection.innerHTML.trim();
                }
            }
            div.parentNode.removeChild(div);
            circles.push(circle);
        }
        return circles;
    }
    function impress_append(html)
    {
        var div = document.getElementById('impress');
        div.innerHTML = div.innerHTML + html;
    }
    function circle_write(angle, content, radius, classes)
    {
        if(radius == undefined) radius = 300;
        if(classes == undefined) classes = 'section'
            var a = Math.PI * angle / 180;
        var rotation = " data-rotate=" + angle;
        impress_append("<div class='step "+classes+"' data-x="
                + Math.floor(Math.cos(a) * radius)
                + " data-y=" + Math.floor(Math.sin(a) * radius)
                + rotation + " data-scale=0.2>"
                + content + "</div>");
    }
    var circles = parse_circles();
    for(var circle in circles)
    {
        var doc = circles[circle];
        console.log(doc);
        var sections = Object.keys(doc);
        var delta = 360.0 / sections.length;
        for(var i = 0; i < sections.length; i++)
        {
            var section_name = sections[i];
            circle_write(i * delta, section_name);
            var subsections = doc[section_name]["sections"]
                var names = Object.keys(subsections)
                var length = names.length;
            impress_append("<div class=arrow></div>");
            for(var j = 0; j < length; j++)
            {
                circle_write(i * delta, '<div class=section_name>'
                        +  names[j] + "</div>" + subsections[names[j]],
                        (j + 2) * 600, 'subsection');
                if(j < (length - 1))
                    impress_append("<div class=arrow></div>");
            }
            circle_write(i * delta, "");
        }
    }
}
