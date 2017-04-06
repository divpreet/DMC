package au.com.westpac.consumer.cccwow.ordervisacard;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class AppServlet Serves default index view in case of
 * /app
 */
@WebServlet(urlPatterns = { "/app" })
public class AppServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final Logger LOG = LoggerFactory.getLogger(AppServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AppServlet() {
		super();
	}

	/**
	 * @throws IOException
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Set standard HTTP/1.1 no-cache headers.
		response.setHeader("Cache-Control", "private, no-store, no-cache, must-revalidate");

		// Set standard HTTP/1.0 no-cache header.
		response.setHeader("Pragma", "no-cache");

		// Disable cache for all proxies.
		response.setDateHeader("Expires", 0);

		// Set character encoding for special characters
		response.setCharacterEncoding("UTF-8");
		
		try {

			request.getRequestDispatcher("WEB-INF/index.jsp").forward(request, response);

		} catch (IOException | ServletException e) {

			LOG.error("AppServlet error :: [{}]", e);
		}

	}
}
