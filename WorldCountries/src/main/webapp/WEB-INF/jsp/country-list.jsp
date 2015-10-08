<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8"/>
    <title>World - Countries</title>
    <link rel="stylesheet" href="<c:url value=" /css/world.css"/>" type="text/css"/>
  </head>
  
  <body>
  
    <c:if test="${msg != null}">
      <div><span class="message shadow">${fn:escapeXml(msg)}</span></div>
    </c:if>
  
    <h1><a href="<c:url value=" /home"/>">World</a></h1>
    
    <section>
    
      <a href="<c:url value=" countries/blank"/>">
        <button>Add New</button>
      </a>

      <table class="list silver">
        <tr>
          <th> </th>
          <th>Countries</th>
        </tr>
        <c:forEach items="${countries}" var="country">
          <tr>
            <td>
              <a href="<c:url value='countries/${country.id}?for-update=true'/>">
                <img src="<c:url value=" /images/edit.gif"/>"/>
              </a>
            </td>
            <td>
              <a href="<c:url value='/countries/${country.id}'/>">
                ${fn:escapeXml(country.name)}
              </a>
            </td>
          </tr>
        </c:forEach>
      </table>

    </section>
    
  </body>
</html>