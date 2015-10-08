<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8"/>
    
    <title>World - Country Details</title>    
    
    <link rel="stylesheet" href="<c:url value="/css/world.css" />" type="text/css"/>
  </head>

  <body>
  
    <c:if test="${msg != null}">
      <div><span class="message shadow">${fn:escapeXml(msg)}</span></div>
    </c:if>
  
    <h1><a href="<c:url value=" /home"/>">World</a></h1>
    
    <section>
      <form:form modelAttribute="country" action="${pageContext.request.contextPath}/countries" method="POST">
        <button type="submit" name="delete" onclick="return confirm('Delete ${fn:escapeXml(country.name)}?')">
          Delete
        </button>
      </form:form>
      
      <table class="details silver">
        <tr>
          <th colspan="2">Country Details</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${fn:escapeXml(country.name)}</td>
        </tr>
        <tr>
          <td>Area (sq mi)</td>
          <td><fmt:formatNumber type="number" value="${country.area}"/></td>
        </tr>
        <tr>
          <td>Population</td>
          <td><fmt:formatNumber type="number" value="${country.population}"/></td>
        </tr>        
      </table>

    </section>
    
    <a href="<c:url value=" /countries"/>" >
      &laquo; back
    </a>
    
  </body>
</html>