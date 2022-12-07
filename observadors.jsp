<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.* " %>
<%@ page import="java.io.*" %>

<%
try {
    String driver = "org.postgresql.Driver";
    String url = "jdbc:postgresql://localhost/mbms";
    String username = "postgres";
    String password = "postgres";
    /*String url = "jdbc:postgresql://95.216.35.146/mbms";
    String username = "mbms_ro";
    String password = "J<`7XAe+?u4oLLZge&s=e\"%;/(Fy<4>?";*/
    String myDataField = null;
    String myQuery = "";
    if (request.getParameter("especie").equals("-")) {
	    myQuery = "select json_agg(p) from (select m.autor_id,su.nombre_ubicacion," +
	    " case when EXTRACT(DAY FROM fecha) < 16 then '1a quinzena'  else '2a quinzena' end as quinzena,"+
	    " case when EXTRACT(MONTH FROM fecha) = 3 then 'Març' "+
	     " when EXTRACT(MONTH FROM fecha) = 4 then 'Abril' "+
	    " when EXTRACT(MONTH FROM fecha) = 5 then 'Maig' "+
	    " when EXTRACT(MONTH FROM fecha) = 6 then 'Juny' "+
	    " when EXTRACT(MONTH FROM fecha) = 7 then 'Juliol' "+
	    " when EXTRACT(MONTH FROM fecha) = 8 then 'Agost' "+
	    " when EXTRACT(MONTH FROM fecha) = 9 then 'Setembre' "+
	    "  when EXTRACT(MONTH FROM fecha) = 10 then 'Octubre' "+
	    "  when EXTRACT(MONTH FROM fecha) = 11 then 'Novembre' "+
	    " end AS mes, EXTRACT(YEAR FROM fecha) as year " +
	    " from samples_muestreo m,samples_ubicacion su where " +
	    "  m.ubicacion_id = su.id  group by quinzena, mes, m.autor_id, su.nombre_ubicacion, year order by quinzena, mes,nombre_ubicacion,year) p";
    } else {
    	 myQuery = "select json_agg(p) from (select m.autor_id,su.nombre_ubicacion," +
     		    " case when EXTRACT(DAY FROM fecha) < 16 then '1a quinzena'  else '2a quinzena' end as quinzena,"+
     		    " case when EXTRACT(MONTH FROM fecha) = 3 then 'Març' "+
     		     " when EXTRACT(MONTH FROM fecha) = 4 then 'Abril' "+
     		    " when EXTRACT(MONTH FROM fecha) = 5 then 'Maig' "+
     		    " when EXTRACT(MONTH FROM fecha) = 6 then 'Juny' "+
     		    " when EXTRACT(MONTH FROM fecha) = 7 then 'Juliol' "+
     		    " when EXTRACT(MONTH FROM fecha) = 8 then 'Agost' "+
     		    " when EXTRACT(MONTH FROM fecha) = 9 then 'Setembre' "+
     		    "  when EXTRACT(MONTH FROM fecha) = 10 then 'Octubre' "+
     		    "  when EXTRACT(MONTH FROM fecha) = 11 then 'Novembre' "+
     		    " end AS mes, EXTRACT(YEAR FROM fecha) as year " +
     		    " from samples_recuento r ,samples_muestreo m,samples_ubicacion su,samples_especie se where m.id = r.muestreo_id and se.id = r.especie_id " +
     		    " and m.ubicacion_id = su.id and se.nombre_especie = '" + request.getParameter("especie") + "' group by m.autor_id, quinzena, mes,su.nombre_ubicacion, year order by m.autor_id,quinzena, mes,su.nombre_ubicacion,year) p";
    }
    Connection myConnection = null;
    PreparedStatement myPreparedStatement = null;
    ResultSet myResultSet = null;
    Class.forName(driver).newInstance();
    myConnection = DriverManager.getConnection(url,username,password);
    System.out.println(myQuery);
    myPreparedStatement = myConnection.prepareStatement(myQuery);
    ResultSet rs = myPreparedStatement.executeQuery();
	while(rs.next()){
        String valor = String. valueOf(rs.getObject(1));
		out.print(valor);
        myConnection.close();
	}
 

}
catch(ClassNotFoundException e){
    e.printStackTrace();
}
catch (SQLException ex) {
}
%>
