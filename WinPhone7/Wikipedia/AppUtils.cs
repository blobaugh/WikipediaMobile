using System.Runtime.Serialization;
using WP7GapClassLib.PhoneGap;
using WP7GapClassLib.PhoneGap.Commands;
using WP7GapClassLib.PhoneGap.JSON;
using System.Windows;
using System.Windows.Navigation;
using System.Windows.Controls;
using Microsoft.Phone.Controls;
using Wikipedia;

namespace PhoneGap.Extension.Commands
{
    public class AppUtils : BaseCommand
    {
        public class ApplicationExitException : System.Exception
        {
        }

        public void exit(string args)
        {

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                throw new ApplicationExitException();
            });
        }
    }
}
